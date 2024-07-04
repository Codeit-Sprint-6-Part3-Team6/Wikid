import Image from "next/image";
import IconButton from "@components/IconButton";
import xIcon from "@icons/ic_X.svg";
import cameraIcon from "@icons/ic_camera.svg";

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
    <div className="relative h-[200px]">
      <label
        style={backgroundImage}
        className={`flex h-[200px] w-[200px] cursor-pointer items-center justify-center rounded-full bg-[#0000004d] bg-cover bg-center bg-no-repeat bg-blend-multiply hover:bg-[#00000080]`}
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
          className="absolute right-0 top-0"
          src={xIcon}
          alt="x-button"
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default ProfileImageEditor;
