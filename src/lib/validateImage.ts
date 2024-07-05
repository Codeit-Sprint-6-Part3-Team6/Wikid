export const validateImage = (imageUrl: string | null) => {
  return imageUrl?.includes("sprint") ? imageUrl : "/icons/ic_profile.svg";
};
