import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import AlarmModal from "@components/AlarmModal";
import Button from "@components/Button";
import LinkCopyButton from "@components/LinkCopyButton";
import TextEditor from "@components/TextEditor";
import ContentPresenter from "@components/wikipage/ContentPresenter";
import ProfileCard from "@components/wikipage/ProfileCard";
//import useModal from "@hooks/useModal";
import { getImageUrl } from "@lib/api/imageApi";
import { getProfile, patchProfile } from "@lib/api/profileApi";
import { Profile } from "@lib/types/Profile";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const code = context.query["code"];

  let profile: Profile | null = null;
  try {
    profile = await getProfile(code);
  } catch (error) {
    console.error(error);
  }

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile,
    },
  };
}

function WikiPage({ profile: initialProfile }: { profile: Profile }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [content, setContent] = useState(initialProfile.content); // 나중에 저장할 때 한 번에 바꿔서 send
  const [profileImage, setProfileImage] = useState(initialProfile.image); // 나중에 저장할 때 한 번에 바꿔서 send
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleWikiContentChange = (value: string) => {
    setContent(value);
  };

  const handleInputFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [e.target.id]: e.target.value,
    }));
  };

  const handleImageInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileImage(url);
      e.target.value = "";
    }
  };

  const handleDeleteProfileImageClick = () => {
    setProfileImage(null);
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirm("저장하시겠습니까?")) {
      if (
        initialProfile === profile && //항상 최신
        initialProfile.content === content && //업데이트필요
        initialProfile.image === profileImage //업데이트필요
      ) {
        alert("변경사항이 없습니다.");
      } else if (
        profileImage !== initialProfile.image &&
        profileImage !== null
      ) {
        const res = await fetch(profileImage);
        const blob = await res.blob(); // blob: binary large object, 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용
        const parts = blob.type.split("/"); // type 문자열로부터 확장자 추출
        const imageFile = new File([blob], `image.${parts[1]}`, {
          type: blob.type,
        });
        const imageUrl = (await getImageUrl(imageFile)).url;

        setProfile((prevProfile) => ({
          ...prevProfile,
          content,
          image: imageUrl,
        }));
      } else if (profileImage === null) {
        //이미지 삭제함
        setProfile((prevProfile) => ({
          ...prevProfile,
          content,
          image: profileImage,
        }));
      } else {
        // 이미지는 변화가 없는데 소개글만 바뀜
        setProfile((prevProfile) => ({
          ...prevProfile,
          content,
        }));
      }
    } else {
      return;
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const sendEditedProfile = async (profile: Profile) => {
    try {
      await patchProfile(profile);
      alert("저장되었습니다.");
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      sendEditedProfile(profile);
    }
  }, [profile]);

  return (
    <>
      <div
        className={`flex justify-between gap-20 ${isEditMode ? "pl-[200px] pr-[80px]" : "mx-auto max-w-[1200px]"}`}
      >
        {isEditMode ? (
          <TextEditor
            type="wiki"
            name={initialProfile.name}
            className="mt-10"
            content={content}
            onChange={handleWikiContentChange}
          />
        ) : (
          <div className="mt-20 w-full max-w-[800px] flex-shrink-0">
            <div className="mb-8 flex items-center justify-between">
              <div className="text-gray500 text-[48px] font-semibold">
                {initialProfile.name}
              </div>
              <Button
                type="button"
                color="green"
                text="위키 참여하기"
                className="px-[42px] py-[10.5px]"
                onClick={() => {
                  setIsEditMode(true);
                }}
              />
            </div>
            <LinkCopyButton
              link={`http://localhost:3000/wiki/${initialProfile.code}`}
              className="mb-14"
            />
            <ContentPresenter content={initialProfile.content} />
          </div>
        )}

        <div
          className={`${isEditMode ? "w-[400px]" : "w-[320px]"} mt-10 flex-shrink-0`}
        >
          <ProfileCard
            className=""
            profile={profile}
            profileImage={profileImage}
            isEditMode={isEditMode}
            onFocusOut={handleInputFocusOut}
            onFileChange={handleImageInputChange}
            onDeleteClick={handleDeleteProfileImageClick}
          />
          {isEditMode && (
            <div className="mt-8 flex justify-end gap-[10px]">
              <Button
                type="button"
                text="취소"
                color="white"
                className="px-5 py-2"
                onClick={handleCancelClick}
              />
              <Button
                type="button"
                text="저장"
                color="green"
                className="px-5 py-2"
                onClick={handleSubmitClick}
              />
            </div>
          )}
        </div>
      </div>
      <AlarmModal
        type="alert"
        isOpen={isModalOpen}
        handleIsOpen={setIsModalOpen}
        heading="저장하지 않고 나가시겠어요?"
        message="작성하신 모든 내용이 사라집니다."
        buttonText="페이지 나가기"
        onClick={router.reload}
      />
    </>
  );
}

export default WikiPage;
