import { CronJob } from "cron";
import dayjs from "dayjs";
import uts from "dayjs/plugin/utc";

import { User } from "../models/User.model";

dayjs.extend(uts);
const removeUser = async () => {
  const previousDay = dayjs().utc().subtract(1, "day");
  await User.deleteMany({ updatedAt: { $lte: previousDay } });
};

export const croneRemoveUser = new CronJob("* * * * * *", removeUser);
