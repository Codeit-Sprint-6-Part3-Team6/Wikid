import Image from "next/image";
import noSearch from "@images/no_search.png";

interface NoResultProps {
  item: string;
}

const NoResult = ({ item }: NoResultProps) => {
  return (
    <div className="p-[150px_0] text-center">
      <div className="mb-[32px] text-[20px] font-medium text-gray400">
        &quot;{item}&quot; 와 일치하는 검색 결과가 없어요.
      </div>
      <div className="m-[0_auto] w-[145px]">
        <Image
          src={noSearch}
          alt="검색결과없음"
          width={145}
          height={145}
          className=""
        />
      </div>
    </div>
  );
};

export default NoResult;
