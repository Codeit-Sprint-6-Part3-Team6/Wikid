import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { GetServerSidePropsContext } from "next";
import LinkCopyButton from "@components/LinkCopyButton";
import TextEditor from "@components/TextEditor";
import ProfileCard from "@components/wikipage/ProfileCard";
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
    if (profileImage !== null) {
      const res = await fetch(profileImage);
      const blob = await res.blob(); // blob: binary large object, 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용
      const parts = blob.type.split("/"); // type 문자열로부터 확장자 추출
      const imageFile = new File([blob], `image.${parts[1]}`, {
        type: blob.type,
      });
      const imageUrl = (await getImageUrl(imageFile)).url;
      setProfile((prevProfile) => ({
        ...prevProfile,
        // content: content,
        content,
        image: imageUrl,
      }));
    }
  };

  const sendEditedProfile = async (profile: Profile) => {
    try {
      await patchProfile(profile);
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
    <div>
      <LinkCopyButton link="https://www.wikied.kr/wikicode" /> {/*test code*/}
      <button type="button" onClick={handleSubmitClick}>
        test
      </button>
      {isEditMode ? (
        <TextEditor
          type="wiki"
          content={content}
          onChange={handleWikiContentChange}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      )}
      {profile && (
        <ProfileCard
          profile={profile}
          profileImage={profileImage}
          isEditMode={isEditMode}
          onFocusOut={handleInputFocusOut}
          onFileChange={handleImageInputChange}
          onDeleteClick={handleDeleteProfileImageClick}
        />
      )}
    </div>
  );
}

export default WikiPage;
