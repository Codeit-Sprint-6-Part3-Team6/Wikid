import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Button from "@components/Button";
import LinkCopyButton from "@components/LinkCopyButton";
import ContentPresenter from "@components/wikipage/ContentPresenter";
import ProfileCard from "@components/wikipage/ProfileCard";
import QuizModal from "@components/wikipage/QuizModal";
import useEditMode from "@hooks/useEditMode";
import { useAuth } from "@context/AuthContext";
import { getProfile, checkIsEditing } from "@lib/api/profileApi";
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

  let isEditable: boolean = false;
  try {
    const response = await checkIsEditing(code);
    isEditable = response ? false : true;
  } catch (error) {
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
  profile,
  isEditable: initialIsEditable,
}: {
  profile: Profile;
  isEditable: boolean;
}) {
  const {
    isQuizOpen,
    handleQuizOpen,
    handleQuizSubmit,
    triggerEditMode,
    errorMessage,
    clearErrorMessage,
  } = useEditMode();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleEditClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      triggerEditMode(profile.code);
    }
  };

  return (
    <>
      <div
        className={`mx-auto flex max-w-[1600px] flex-col px-5 py-10 pb-28 md:px-[60px] md:py-[60px] lg:grid lg:grid-cols-[1fr_auto] lg:grid-rows-[auto_1fr] lg:gap-20 lg:gap-y-0 lg:px-[100px] lg:py-20`}
      >
        <div className="">
          <div className="mb-6 flex items-center justify-between md:mb-8">
            <div className="text-[32px] font-semibold leading-none text-gray500 md:text-[48px]">
              {profile.name}
            </div>
            <Button
              type="button"
              color="green"
              text="위키 참여하기"
              className="px-[22px] py-[9.5px] md:px-[42px] md:py-[10.5px]"
              onClick={handleEditClick}
            />
          </div>
          <>
            <LinkCopyButton
              link={`${process.env.NEXT_PUBLIC_SITE_URL}/${profile.code}`}
              className="mb-4 lg:mb-14"
            />
            {!initialIsEditable && (
              <div
                style={{ backgroundImage: `url("/icons/ic_problem.svg")` }}
                className="mb-5 flex h-[54px] w-full items-center rounded-[10px] bg-gray50 bg-[20px_center] bg-no-repeat pl-[54px] leading-6 text-gray500 md:pr-[54px] lg:mt-[-40px]"
              >
                {"앞 사람의 편집이 끝나면 위키 참여가 가능합니다."}
              </div>
            )}
          </>
        </div>
        <div className="order-1 mt-6 lg:mt-0">
          <ContentPresenter content={profile.content} onClick={handleEditClick} />
        </div>
        <div className="flex flex-shrink-0 flex-col lg:col-[2/span_1] lg:row-[1/span_2] lg:block lg:w-[320px]">
          <ProfileCard profile={profile} />
        </div>
      </div>
      <QuizModal
        isOpen={isQuizOpen}
        securityQuestion={profile.securityQuestion}
        handleIsOpen={handleQuizOpen}
        onClick={handleQuizSubmit}
        code={profile.code}
        errorMessage={errorMessage}
        deleteError={clearErrorMessage}
      />
    </>
  );
}

export default WikiPage;
