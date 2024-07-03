import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import AlarmModal from "@components/AlarmModal";
import Button from "@components/Button";
import LinkCopyButton from "@components/LinkCopyButton";
import TextEditor from "@components/TextEditor";
import Toast from "@components/Toast";
import ContentPresenter from "@components/wikipage/ContentPresenter";
import ProfileCard from "@components/wikipage/ProfileCard";
import QuizModal from "@components/wikipage/QuizModal";
import useEditMode from "@hooks/useEditMode";
//import useModal from "@hooks/useModal";
import { getImageUrl } from "@lib/api/imageApi";
import { getProfile, checkIsEditing, patchProfile } from "@lib/api/profileApi";
import { Profile, profileEditResponse } from "@lib/types/Profile";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const code = context.query["code"];

  let profile: Profile | null = null;
  try {
    profile = await getProfile(code);
  } catch (error) {
    console.error(error);
  }

  let isEditable: boolean = false;
  try {
    const response = await checkIsEditing(code);
    isEditable = response ? false : true;
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
      isEditable,
    },
  };
}

function WikiPage({
  profile: initialProfile,
  isEditable: initialIsEditable,
}: {
  profile: Profile;
  isEditable: boolean;
}) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [content, setContent] = useState(initialProfile.content); // 나중에 저장할 때 한 번에 바꿔서 send
  const [profileImage, setProfileImage] = useState(initialProfile.image); // 나중에 저장할 때 한 번에 바꿔서 send
  // const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isQuizOpen,
    handleModalOpen,
    toastOpened,
    handleQuizSubmit,
    triggerEditMode,
    isEditMode,
  } = useEditMode();
  const router = useRouter();

  const handleEditClick = () => {
    triggerEditMode(initialProfile.code);
  };

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
      } else if (
        profileImage !== initialProfile.image &&
        profileImage === null
      ) {
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
    if (isEditMode.content) {
      sendEditedProfile(profile);
    }
  }, [profile]);

  return (
    <>
      <div
        className={`flex justify-between gap-20 ${isEditMode ? "pl-[200px] pr-[80px]" : "mx-auto max-w-[1200px]"}`}
      >
        {isEditMode.content ? (
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
              <div className="text-[48px] font-semibold text-gray500">
                {initialProfile.name}
              </div>
              <Button
                type="button"
                color="green"
                text="위키 참여하기"
                className="px-[42px] py-[10.5px]"
                onClick={handleEditClick}
              />
            </div>
            <LinkCopyButton
              link={`http://localhost:3000/wiki/${initialProfile.code}`}
              className="mb-14"
            />
            {!initialIsEditable && (
              <div
                style={{ backgroundImage: `url("/icons/ic_problem.svg")` }}
                className="mb-5 mt-[-40px] flex h-[54px] w-full items-center rounded-[10px] bg-gray50 bg-[20px_center] bg-no-repeat px-[55px] leading-6 text-gray500"
              >
                {"앞 사람의 편집이 끝나면 위키 참여가 가능합니다."}
              </div>
            )}
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
            isEditMode={isEditMode.profile}
            onFocusOut={handleInputFocusOut}
            onFileChange={handleImageInputChange}
            onDeleteClick={handleDeleteProfileImageClick}
          />
          {isEditMode.content && (
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
      <QuizModal
        isOpen={isQuizOpen}
        handleIsOpen={handleModalOpen}
        onClick={handleQuizSubmit}
        code={initialProfile.code}
      />
      <Toast type="red" isToastOpened={toastOpened}>
        다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.
      </Toast>
    </>
  );
}

export default WikiPage;
