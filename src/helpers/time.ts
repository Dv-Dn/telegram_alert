const prefferedTime = [
  '6:30-18:30',
  '7:30-19:30',
  '8:30-20:30',
  '9:30-21:30',
  '10:30-21:30',
  '11:30-22:30',
] as const;

export type prefferedTimeType = typeof prefferedTime[number];

export function correctTime(
  sheduleTime: Date,
  prefferedTime: prefferedTimeType
) {
  const pTime = prefferedTime
    .split('-')
    .map((el) => el.split(':').map((c) => +c));

  const a = new Date(sheduleTime);
  const b = new Date(sheduleTime).setHours(pTime[0][0], pTime[0][1]);
  const c = new Date(sheduleTime).setHours(pTime[1][0], pTime[1][1]);

  if (a.getTime() < b) {
    a.setHours(pTime[0][0], pTime[0][1]);
  } else if (a.getTime() > c) {
    a.setDate(a.getDate() + 1);
    a.setHours(pTime[0][0], pTime[0][1]);
  }

  return a;
}

const shortInfo = [20, 60 * 8, 60 * 24];

const longInfo = [60 * 24, 60 * 24 * 14, 60 * 24 * 45];

export const updatedNotificationTimeByStep = (date: Date, step: number) =>
  new Date(date.getTime() + longInfo[step]);
