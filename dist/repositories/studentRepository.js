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
exports.StudentRepository = void 0;
const databaseAdapter_1 = require("../adapters/databaseAdapter");
class StudentRepository {
    constructor() {
        this.create = (student) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                databaseAdapter_1.postgresDB.connect((err) => {
                    if (err) {
                        console.error("Error connecting to postgresql database", err);
                        reject(err);
                        return;
                    }
                    databaseAdapter_1.postgresDB.query('INSERT INTO tbl_students(name, nationality, career, password, phone, age) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ', [student.name, student.nationality, student.career, student.password, student.phone, student.age], (queryError, result) => {
                        // postgresDB.end();
                        if (queryError) {
                            console.log('Error en la consulta', queryError);
                            reject(queryError);
                            return;
                        }
                        const newStudent = Object.assign(Object.assign({}, student), { id: result.rows[0].id });
                        resolve(newStudent);
                    });
                });
            });
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                databaseAdapter_1.postgresDB.query("SELECT * FROM tbl_students ORDER BY name ASC", (error, results) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        reject(error);
                        return;
                    }
                    resolve(results.rows);
                });
            });
        });
        this.getById = (studentId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                databaseAdapter_1.postgresDB.query("SELECT * FROM tbl_students WHERE id = ?", [studentId], (error, results) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        reject(error);
                        return;
                    }
                    if (results.rowCount === 0) {
                        resolve(null);
                    }
                    else {
                        resolve(results.rows[0]);
                    }
                });
            });
        });
        this.update = (studentId, updateStudent) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                databaseAdapter_1.postgresDB.query("UPDATE tbl_students SET ? WHERE id = ?", [updateStudent, studentId], (error, results) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        reject(error);
                        return;
                    }
                    if (results.affectedRows === 0) {
                        resolve(null);
                    }
                    else {
                        resolve(updateStudent);
                    }
                });
            });
        });
        this.delete = (studentId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                databaseAdapter_1.postgresDB.query("DELETE FROM tbl_students WHERE id = ?", [studentId], (error, results) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        reject(error);
                        return;
                    }
                    resolve(results.affectedRows > 0);
                });
            });
        });
    }
}
exports.StudentRepository = StudentRepository;
