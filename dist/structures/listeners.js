"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ready_1 = require("../listeners/ready");
var shardReady_1 = require("../listeners/shardReady");
var interactionCreate_1 = require("../listeners/interactionCreate");
exports.default = { ready: ready_1.ready, shardReady: shardReady_1.shardReady, interactionCreate: interactionCreate_1.interactionCreate };
