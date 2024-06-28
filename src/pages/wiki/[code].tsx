import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import TextEditor from "@components/TextEditor";
import ProfileCard from "@components/wikipage/ProfileCard";
import { getProfile } from "@lib/api/profileApi";
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
  const [isEditMode, setIsEditMode] = useState(true);

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleInputFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <TextEditor type="wiki" content={content} onChange={handleChange} />
      {profile && (
        <ProfileCard
          profile={profile}
          profileImage={profileImage}
          isEditMode={isEditMode}
          onFocusOut={handleInputFocusOut}
        />
      )}
    </div>
  );
}

export default WikiPage;
