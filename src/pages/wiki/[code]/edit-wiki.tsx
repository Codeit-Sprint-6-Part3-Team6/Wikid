import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import AlarmModal from "@components/AlarmModal";
import Button from "@components/Button";
import ImageUploadModal from "@components/ImageUploadModal";
import TextEditor from "@components/TextEditor";
import ProfileCard from "@components/wikipage/ProfileCard";
import useEditMode from "@hooks/useEditMode";
import useEditorContent from "@hooks/useEditorContent";
import useModal from "@hooks/useModal";
import { useWikiTimeLimit } from "@context/WikiTimeLimitContext";
import { getImageUrl } from "@lib/api/imageApi";
import { getProfile, patchProfile } from "@lib/api/profileApi";
import { getImageFile } from "@lib/getImageFile";
import { Profile } from "@lib/types/Profile";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const code = context.query["code"];

  let profile: Profile | null = null;
  try {
    profile = await getProfile(code);
  } catch (error) {
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

function EditWikiPage({ profile: initialProfile }: { profile: Profile; isEditable: boolean }) {
  const { content, setContent, handleContentChange } = useEditorContent(initialProfile.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);
  const { refreshTimer, renewAuthority, isTimeOutModalOpen } = useEditMode();
  const { setIsTimeOutModalOpen } = useWikiTimeLimit();
  const { isOpen: isImageModalOpen, toggleIsOpen: toggleIsImageModalOpen } = useModal();
  const router = useRouter();

  const handleImageUpload = async (imagePreviewUrl: string) => {
    try {
      const imageFile = await getImageFile(imagePreviewUrl);
      const imageUrl = (await getImageUrl(imageFile)).url;
      const imgTag = `<img src="${imageUrl}" />`;
      setContent((prevContent) => prevContent + imgTag);
      toggleIsImageModalOpen();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelWarningOpen = () => {
    setIsCancelWarningOpen((prev) => !prev);
  };

  const handleSubmitClick = async (timeOut: boolean = false) => {
    if (confirm("수정사항을 저장하시겠습니까?")) {
      setIsSaving(true);
      if (initialProfile.content === content) {
        alert("수정사항이 없습니다.");
        if (timeOut) {
          router.replace(`/wiki/${initialProfile.code}`);
        }
      } else {
        if (timeOut) {
          await renewAuthority();
        }
        initialProfile.content = content;
        await sendEditedProfile(initialProfile);
      }
      setIsTimeOutModalOpen(false);
    } else {
      return;
    }
  };

  const sendEditedProfile = async (profile: Profile) => {
    try {
      await patchProfile(profile);
      alert("저장되었습니다.");
      router.replace(`/wiki/${initialProfile.code}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isSaving === false) {
      refreshTimer();
    }
  }, [content]);

  return (
    <>
      <div
        className={`mx-auto flex max-w-[1600px] flex-col px-5 py-10 pb-28 md:px-[60px] md:py-[60px] lg:grid lg:grid-cols-[1fr_auto] lg:grid-rows-[auto_1fr] lg:gap-20 lg:gap-y-0 lg:px-[100px] lg:py-20`}
      >
        <div>
          <div className="mb-6 flex items-center justify-between md:mb-8">
            <div className="text-[32px] font-semibold leading-none text-gray500 md:text-[48px]">
              {initialProfile.name}
            </div>
            <div className="flex justify-end gap-[10px]">
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
          </div>
        </div>
        <TextEditor
          type="wiki"
          name={initialProfile.name}
          className="order-1 mt-10 lg:order-none lg:mt-0"
          content={content}
          onChange={handleContentChange}
          onClick={toggleIsImageModalOpen}
        />
        <div className="flex flex-shrink-0 flex-col lg:col-[2/span_1] lg:row-[1/span_2] lg:block lg:w-[320px]">
          <ProfileCard profile={initialProfile} />
        </div>
      </div>
      <AlarmModal
        type="alert"
        isOpen={isCancelWarningOpen}
        handleIsOpen={handleCancelWarningOpen}
        heading="저장하지 않고 나가시겠어요?"
        message="작성하신 모든 내용이 사라집니다."
        buttonText="페이지 나가기"
        onClick={() => router.replace(`/wiki/${initialProfile.code}`)}
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
      <ImageUploadModal
        isOpen={isImageModalOpen}
        toggleIsOpen={toggleIsImageModalOpen}
        onClick={handleImageUpload}
      />
    </>
  );
}

export default EditWikiPage;
