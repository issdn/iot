import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export const cassandraTimeToDisplayTime = (time: string) => {
  const hourMinutesSecondsNanoseconds = time.split(":");
  const date = dayjs
    .utc()
    .set("h", parseInt(hourMinutesSecondsNanoseconds[0]))
    .set("m", parseInt(hourMinutesSecondsNanoseconds[1]));
  return dayjs.tz(date, "Europe/Berlin").format("HH:mm");
};
