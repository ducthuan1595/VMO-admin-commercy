export const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getRecentYear = () => {
  const currY = new Date().getFullYear();
  return [currY, currY-1, currY-2, currY-3, currY-4, currY-5, currY-6];
}
