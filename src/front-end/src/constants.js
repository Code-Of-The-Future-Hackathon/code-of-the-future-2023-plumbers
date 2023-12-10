export const DRAWER_WIDTH = 240;

export const GREEN_SPACES_COLORS = {
  garden: "#228B22", // Forest Green
  grass: "#7CFC00", // Lawn Green
  grassland: "#9ACD32", // Yellow-Green
  park: "#32CD32", // Leaf Green
  scrub: "#808000", // Olive
};

export const GREEN_SPACES_AVAILABLE = Object.keys(GREEN_SPACES_COLORS).reduce(
  (acc, key) => {
    acc[key] = true;
    return acc;
  },
  {}
);

export const GREEN_SPACES_SIZES = {
  small: true,
  medium: true,
  large: true,
};
