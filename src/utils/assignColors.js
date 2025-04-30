const COLORS = [
  "rgba(254, 208, 87, 1)",
  "rgba(255, 216, 208, 1)",
  "rgba(253, 148, 152, 1)",
  "rgba(197, 186, 255, 1)",
  "rgba(110, 120, 232, 1)",
  "rgba(74, 86, 226, 1)",
  "rgba(129, 225, 255, 1)",
  "rgba(36, 204, 167, 1)",
  "rgba(0, 173, 132, 1)",
];

export const assignColors = (data) => {
  return data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));
};
