export const truncText = (text: string, limit: number = 20): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + "..";
  }
  return text;
};