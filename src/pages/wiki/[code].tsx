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
import { useAuth } from "@context/AuthContext";
//import useModal from "@hooks/useModal";
import { getImageUrl } from "@lib/api/imageApi";
import { getProfile, checkIsEditing, patchProfile } from "@lib/api/profileApi";
import { getImageFile } from "@lib/getImageFile";
import { Profile } from "@lib/types/Profile";

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
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);
  const {
    isQuizOpen,
    handleQuizOpen,
    toastOpened,
    handleQuizSubmit,
    triggerEditMode,
    isEditMode,
    refreshTimer,
    isTimeOutModalOpen,
    errorMessage,
    deleteError,
  } = useEditMode();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleEditClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      triggerEditMode(initialProfile.code);
    }
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

  const handleIsOpen = () => {
    setIsCancelWarningOpen((prev) => !prev);
  };

  const handleSubmitClick = async (timeOut: boolean = false) => {
    if (confirm("수정사항을 저장하시겠습니까?")) {
      setIsSaving(true);
      console.log(`handleSubmit ${timeOut}`);
      if (
        initialProfile === profile && //항상 최신
        initialProfile.content === content && //업데이트필요
        initialProfile.image === profileImage //업데이트필요
      ) {
        alert("수정사항이 없습니다.");
        if (timeOut) {
          console.log("reloaded Second");
          router.reload();
        }
      } else {
        if (timeOut) {
          console.log("refreshed in blabla");
          await refreshTimer();
        }
        if (profileImage !== initialProfile.image && profileImage !== null) {
          const imageFile = await getImageFile(profileImage);
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
          console.log("이미지 삭제함");
          //이미지 삭제함
          setProfile((prevProfile) => ({
            ...prevProfile,
            content,
            image: profileImage,
          }));
        } else {
          console.log("이미지는 변화가 없는데 소개글만 바뀜");
          // 이미지는 변화가 없는데 소개글만 바뀜
          setProfile((prevProfile) => ({
            ...prevProfile,
            content,
          }));
        }
      }
    } else {
      return;
    }
  };

  const sendEditedProfile = async (profile: Profile) => {
    try {
      await patchProfile(profile);
      alert("저장되었습니다.");
      router.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isEditMode.content && isSaving) {
      sendEditedProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (isEditMode.content && isSaving === false) {
      console.log("refreshed");
      refreshTimer();
    }
  }, [profile, content, profileImage]);

  return (
    <>
      <div
        className={`mx-auto flex max-w-[1600px] justify-between gap-20 px-[100px] pb-28`}
      >
        <div className="mt-20 w-full">
          <div className="mb-8 flex items-center justify-between">
            <div className="text-[48px] font-semibold text-gray500">
              {initialProfile.name}
            </div>
            {!initialProfile.content ||
            isEditMode.profile ? undefined : isEditMode.content ? (
              <div className="mt-8 flex justify-end gap-[10px]">
                <Button
                  type="button"
                  text="취소"
                  color="white"
                  className="px-5 py-2"
                  onClick={() => setIsCancelWarningOpen(true)}
                />
                <Button
                  type="button"
                  text="저장"
                  color="green"
                  className="px-5 py-2"
                  onClick={() => handleSubmitClick(false)}
                />
              </div>
            ) : (
              <Button
                type="button"
                color="green"
                text="위키 참여하기"
                className="px-[42px] py-[10.5px]"
                onClick={handleEditClick}
              />
            )}
          </div>
          {isEditMode.content ? (
            <TextEditor
              type="wiki"
              name={initialProfile.name}
              className="mt-10"
              content={content}
              onChange={handleWikiContentChange}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className={`mt-10 w-[320px] flex-shrink-0`}>
          <ProfileCard
            className=""
            profile={profile}
            profileImage={profileImage}
            isEditMode={isEditMode.profile}
            onChange={refreshTimer}
            onFocusOut={handleInputFocusOut}
            onFileChange={handleImageInputChange}
            onDeleteClick={handleDeleteProfileImageClick}
          />
          {isEditMode.profile && (
            <div className="mt-8 flex justify-end gap-[10px]">
              <Button
                type="button"
                text="취소"
                color="white"
                className="px-5 py-2"
                onClick={() => setIsCancelWarningOpen(true)}
              />
              <Button
                type="button"
                text="저장"
                color="green"
                className="px-5 py-2"
                onClick={() => handleSubmitClick(false)}
              />
            </div>
          )}
        </div>
      </div>
      <AlarmModal
        type="alert"
        isOpen={isCancelWarningOpen}
        handleIsOpen={handleIsOpen}
        heading="저장하지 않고 나가시겠어요?"
        message="작성하신 모든 내용이 사라집니다."
        buttonText="페이지 나가기"
        onClick={router.reload}
      />
      <AlarmModal
        type="alert"
        isOpen={isTimeOutModalOpen}
        handleIsOpen={() => handleSubmitClick(true)}
        heading="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
        message="위키 참여하기를 통해 다시 위키를 수정해 주세요."
        buttonText="확인"
        onClick={() => handleSubmitClick(true)}
      />
      <QuizModal
        isOpen={isQuizOpen}
        securityQuestion={initialProfile.securityQuestion}
        handleIsOpen={handleQuizOpen}
        onClick={handleQuizSubmit}
        code={initialProfile.code}
        errorMessage={errorMessage}
        deleteError={deleteError}
      />
      <Toast type="red" isToastOpened={toastOpened}>
        다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.
      </Toast>
    </>
  );
}

export default WikiPage;
