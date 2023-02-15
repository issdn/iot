export const toPrettyDateUTC = (date: string) => {
  const dateObject = new Date(date);
  const hours = dateObject.getHours().toString();
  const minutes = dateObject.getMinutes().toString();
  const seconds = dateObject.getSeconds().toString();
  return hours + ":" + minutes + ":" + seconds;
};

export const nsSinceMidnightToTime = (ns: number) => {
  var date = new Date(ns);
  return ns - date.setHours(0, 0, 0, 0);
};

export const removeNanosecondsFromTime = (time: string) => {
  return time.split(".")[0];
};
