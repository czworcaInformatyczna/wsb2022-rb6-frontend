export const changeDateTimeFormat = (date: string) => {
  const tempDate = date.split('T');
  return tempDate[0] + ' ' + tempDate[1].slice(0, 5);
};