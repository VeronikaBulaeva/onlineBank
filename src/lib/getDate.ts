export const getDate = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();
  return [currentYear, currentMonth, currentDay].join("-");
};
