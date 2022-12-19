"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Room = void 0;
var Room;
(function (Room) {
    Room[Room["Light"] = 0] = "Light";
    Room[Room["Dark"] = 1] = "Dark";
})(Room = exports.Room || (exports.Room = {}));
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Estimator"] = 0] = "Estimator";
    UserRole[UserRole["Spectator"] = 1] = "Spectator";
    UserRole[UserRole["Admin"] = 2] = "Admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
