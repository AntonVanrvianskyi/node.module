"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.croneRunner = void 0;
const rm_user_crones_1 = require("./rm.user.crones");
const croneRunner = () => {
    rm_user_crones_1.croneRemoveUser.start();
};
exports.croneRunner = croneRunner;
