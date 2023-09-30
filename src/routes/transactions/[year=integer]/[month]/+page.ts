import type { PageLoad } from './$types';

function addToDate(date: Date, offset: number) {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + offset);
  return newDate;
}

export const load: PageLoad = ({ data }) => {
  const previousMonth = addToDate(data.date, -1);
  const nextMonth = addToDate(data.date, 1);
  return {
    ...data,
    previousMonth,
    nextMonth
  };
};
