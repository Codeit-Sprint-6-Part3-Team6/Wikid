import Image from "next/image";
import IconButton from "@components/IconButton";
import cameraIcon from "@icons/ic_camera.svg";
import xIcon from "@icons/ic_x.svg";

type ProfileImageEditorProps = {
  imageUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ProfileImageEditor({
  imageUrl,
  onChange,
  onClick,
}: ProfileImageEditorProps) {
  const backgroundImage = {
    backgroundImage: `${imageUrl ? `url(${imageUrl})` : "none"}`,
  };

  return (
    <div className="relative h-28 w-28 flex-shrink-0 lg:h-[200px] lg:w-[200px]">
      <label
        style={backgroundImage}
        className={`flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0000004d] bg-cover bg-center bg-no-repeat bg-blend-multiply hover:bg-[#00000080]`}
      >
        <Image
          className="h-[36px] w-[36px]"
          src={cameraIcon}
          alt="camera"
        ></Image>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={onChange}
        ></input>
      </label>
      {imageUrl && (
        <IconButton
          className="md absolute right-[-4px] top-[-4px] w-[18px] md:w-4 lg:right-0 lg:top-0 lg:w-auto"
          src={xIcon}
          alt="x-button"
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default ProfileImageEditor;
