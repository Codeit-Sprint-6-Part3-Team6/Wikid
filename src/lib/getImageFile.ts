export const getImageFile = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob(); // blob: binary large object, 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용
  const parts = blob.type.split("/"); // type 문자열로부터 확장자 추출
  const imageFile = new File([blob], `image.${parts[1]}`, {
    type: blob.type,
  });

  return imageFile;
};
