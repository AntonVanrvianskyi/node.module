import { croneRemoveUser } from "./rm.user.crones";

export const croneRunner = () => {
  croneRemoveUser.start();
};
