"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.db = void 0;
const firebase_admin_1 = require("firebase-admin");
const config_1 = require("../config");
const app_1 = require("firebase-admin/app");
(0, app_1.initializeApp)({
    credential: firebase_admin_1.credential.cert(config_1.envs.GOOGLE_APLICATION_CREDENTIALS)
});
exports.db = (0, firebase_admin_1.firestore)();
exports.authentication = (0, firebase_admin_1.auth)();
