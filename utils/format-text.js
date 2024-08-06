export const formatText = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};
