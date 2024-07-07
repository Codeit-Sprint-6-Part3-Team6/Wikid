import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dropdownIcon from "@icons/ic_arrowDown.svg";

// 드롭다운 옵션들이 상황에 따라 달라지기 때문에 prop으로 받도록 설정
interface DropdownProps {
  options: string[];
  order: string[];
  onClick: (option: string) => void;
  type?: "sort" | string; // 추가된 type prop
}

const Dropdown = ({ options, order, onClick, type }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 열기/닫기 토글 함수
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 드롭다운 옵션 변경 함수
  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
  };

  // 옵션 클릭 시 실행되는 함수, 드롭다운 옵션 변경 후 드롭다운 닫음
  const handleOptionClick = (option: string) => {
    handleDropdownChange(option);
    setIsOpen(false);
    if (onClick) {
      onClick(option);
    }
  };

  // 드롭다운 영역 외부 클릭을 감지해서 드롭다운 닫음
  const handleDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdown);
    return () => {
      document.removeEventListener("mousedown", handleDropdown);
    };
  }, []);

  const containerClass = `relative cursor-pointer items-center ${type === "sort" ? "w-full md:w-[140px]" : "w-auto"}`;
  const dropdownButtonClass = `flex h-[45px] w-full cursor-pointer items-center justify-between rounded-lg bg-gray50 px-5 text-gray-800 transition-all duration-500 hover:bg-gray-200`;
  const dropdownMenuClass = `absolute top-full mt-1.5 w-full rounded-lg bg-white p-1.5 text-gray-800 bg-white z-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]`;

  return (
    <div className={containerClass} ref={dropdownRef}>
      <div className={dropdownButtonClass} onClick={toggleDropdown}>
        {selectedOption}
        <Image
          src={dropdownIcon}
          alt="드롭다운 아이콘"
          // isOpen 상태에 따라 아이콘 회전 애니메이션 추가
          className={`ml-2 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className={dropdownMenuClass}>
          {order.map((order, index) => (
            <div
              key={order}
              className={`cursor-pointer border-solid py-2.5 text-center transition-all duration-500 hover:bg-green-50 hover:text-green300 ${index !== options.length - 1 ? "border-b border-solid border-gray-100" : ""}`}
              onClick={() => {
                handleOptionClick(options[index]);
                onClick(order);
              }}
            >
              {options[index]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
