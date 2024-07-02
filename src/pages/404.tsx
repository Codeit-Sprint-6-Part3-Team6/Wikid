import LinkButton from "@components/LinkButton";

export default function NotFound() {
  return (
    <div className="mt-[350px] flex flex-col items-center gap-[50px]">
      <div className="flex flex-col items-center gap-[20px]">
        <p className="text-[30px] font-normal">찾을 수 없는 페이지입니다. </p>
      </div>
      <LinkButton
        text="홈으로 이동"
        link="/"
        color="green"
        className="h-[50px] w-[200px] text-[25px] font-normal"
      />
    </div>
  );
}
