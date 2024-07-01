export const inputCounter = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setInputCount: (count: number) => void,
  setContent: (content: string) => void,
) => {
  const newValue = e.target.value;
  setInputCount(newValue.length);
  setContent(newValue);
};
