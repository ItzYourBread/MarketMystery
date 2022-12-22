"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.global = exports.commands = void 0;
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var commands = [];
exports.commands = commands;
function global(client) {
    var _this = this;
    client.on('ready', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var commandFolders, _i, commandFolders_1, folder, commandFiles, _a, commandFiles_1, file, slashCommandObject;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    commandFolders = (0, fs_1.readdirSync)("./dist/commands/commandList");
                    _i = 0, commandFolders_1 = commandFolders;
                    _b.label = 1;
                case 1:
                    if (!(_i < commandFolders_1.length)) return [3, 7];
                    folder = commandFolders_1[_i];
                    commandFiles = (0, fs_1.readdirSync)("./dist/commands/commandList/".concat(folder)).filter(function (file) { return file.endsWith('.js'); });
                    _a = 0, commandFiles_1 = commandFiles;
                    _b.label = 2;
                case 2:
                    if (!(_a < commandFiles_1.length)) return [3, 6];
                    file = commandFiles_1[_a];
                    return [4, Promise.resolve().then(function () { return tslib_1.__importStar(require("./commandList/".concat(folder, "/").concat(file))); })];
                case 3:
                    slashCommandObject = _b.sent();
                    if (slashCommandObject.default.data.name) {
                        console.log(chalk_1.default.cyanBright("[Command] ".concat(slashCommandObject.default.data.name, " is loaded")));
                    }
                    return [4, client.createCommand(slashCommandObject.default.data)];
                case 4:
                    _b.sent();
                    commands.push({
                        name: slashCommandObject.default.data.name,
                        execute: slashCommandObject.default.execute,
                    });
                    _b.label = 5;
                case 5:
                    _a++;
                    return [3, 2];
                case 6:
                    _i++;
                    return [3, 1];
                case 7: return [2];
            }
        });
    }); });
}
exports.global = global;
