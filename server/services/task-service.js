"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = exports.updateTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return db.task.findMany();
});
exports.getTasks = getTasks;
const updateTask = (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.task.update({
        where: {
            id,
        },
        data: updatedFields
    });
});
exports.updateTask = updateTask;
const createTask = (newTask) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.task.create({ data: newTask });
});
exports.createTask = createTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.task.delete({
        where: {
            id,
        }
    });
});
exports.deleteTask = deleteTask;
