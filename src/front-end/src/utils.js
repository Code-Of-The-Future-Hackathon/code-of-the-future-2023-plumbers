export const getGreenSpaceSizeResult = (greenSpaceSize) => {
  if (greenSpaceSize < 0.1 && greenSpaceSize > 0) {
    return "small";
  } else if (greenSpaceSize < 1 && greenSpaceSize > 0.1) {
    return "medium";
  } else if (greenSpaceSize > 1) {
    return "large";
  }
  return "no size";
};
