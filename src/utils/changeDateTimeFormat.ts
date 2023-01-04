export const changeDateTimeFormat = (date: string) => {
  if (!date) return '';
  const tempDate = date.split('T');
  return tempDate[0];
};
