import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (dateTime: string | number): string => dayjs(dateTime).format('YYYY-MM-DD');

export const getCurrentDateTime = (): string => dayjs().format('YYYY-MM-DD HH:mm:ss');

export const getCurrentTaskDate = () => {
  const dayIndex = dayjs().tz('Asia/Ho_Chi_Minh').get('day');

  return dayIndex == 0 ? 7 : dayIndex;
};
