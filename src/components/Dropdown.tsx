import { useEffect, useState, useRef } from "react";

interface DropdownProps {
  options: string[];
}

const dropdownIcon = "/icons/ic_arrow_down.svg";

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleOptionClick = (option: string) => {
    handleDropdownChange(option);
    setIsOpen(false);
  };

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

  return (
    <div className="relative cursor-pointer items-center" ref={dropdownRef}>
      <div
        className="flex h-[45px] max-w-[140px] cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-5 text-gray-800 transition-all duration-500 hover:bg-gray-100"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <img
          src={dropdownIcon}
          alt="드롭다운 아이콘"
          className={`ml-2 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full mt-1.5 w-[140px] rounded-lg border border-gray-300 bg-white text-gray-800">
          {options.map((option) => (
            <div
              key={option}
              className="hover:text-green300 m-2 mt-0 cursor-pointer py-2.5 text-center transition-all duration-500 hover:bg-green-50"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
