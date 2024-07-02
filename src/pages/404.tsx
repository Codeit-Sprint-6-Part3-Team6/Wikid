import Animation from "react-lottie-player";
import LinkButton from "@components/LinkButton";
import AnimationJson from "../../public/Animation404.json";

export default function NotFound() {
  return (
    <div className="mt-[90px] flex flex-col items-center">
      <Animation
        loop
        animationData={AnimationJson}
        play
        style={{ width: 800, height: 500 }}
      />
      <div className="flex flex-col items-center gap-[20px]">
        <p className="text-[20px] font-normal text-green200">
          페이지를 찾을 수 없습니다
        </p>
        <LinkButton
          text="홈으로 이동"
          link="/"
          color="green"
          className="h-[45px] w-[150px] text-[20px] font-normal"
        />
      </div>
    </div>
  );
}
