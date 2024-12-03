import {postgresDB} from "../adapters/databaseAdapter";
// import { postgresDB } from "../adapters";
import { StudentEntity } from "../entities";

export class StudentRepository  {

    public create =  async(student : StudentEntity):Promise<StudentEntity | null>  => {
        return new Promise<StudentEntity | null>((resolve, reject) => {
            postgresDB.connect((err)=>{
                if(err){
                    console.error("Error connecting to postgresql database", err);
                    reject(err);
                    return;    
                }
                postgresDB.query('INSERT INTO tbl_students(name, nationality, career, password, phone, age) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ',
                    [student.name, student.nationality, student.career, student.password, student.phone, student.age],
                    (queryError, result)=>{
                        // postgresDB.end();
                        if(queryError){
                            console.log('Error en la consulta', queryError);
                            reject(queryError);
                            return;
                        }

                        const newStudent = {
                            ...student,
                            id: result.rows[0].id
                        }
                        resolve(newStudent);
                    });



            })
        });
    }

    public getAll = async(): Promise<StudentEntity[]> => {
        return new Promise<StudentEntity[]>((resolve,reject) =>{
            postgresDB.query("SELECT * FROM tbl_students ORDER BY name ASC", (error, results) =>{
                
                if(error){
                    console.error("Error en la consulta", error);
                    reject(error);
                    return;
                }
                resolve(results.rows as StudentEntity[]);
            })
        })
    }

    public getById = async(studentId: number): Promise<StudentEntity | null> => {
        return new Promise<StudentEntity | null>((resolve,reject) =>{
            postgresDB.query("SELECT * FROM tbl_students WHERE id = ?",[studentId], (error, results : any) =>{
                if(error){
                    console.error("Error en la consulta", error);
                    reject(error);
                    return;
                }
                if(results.rowCount === 0){
                    resolve(null)
                }else{
                    resolve(results.rows[0] as StudentEntity);
                }
            })
        })
    }
    public update = async(studentId: number, updateStudent: StudentEntity): Promise<StudentEntity | null> => {
        return new Promise<StudentEntity | null>((resolve,reject) =>{
            postgresDB.query("UPDATE tbl_students SET ? WHERE id = ?",[updateStudent,studentId], (error, results : any) =>{
                if(error){
                    console.error("Error en la consulta", error);
                    reject(error);
                    return;
                }
                if(results.affectedRows === 0){
                    resolve(null)
                }else{
                    resolve(updateStudent);
                }
            })
        })
    }
    public delete = async(studentId: number): Promise<boolean> => {
        return new Promise<boolean>((resolve,reject) =>{
            postgresDB.query("DELETE FROM tbl_students WHERE id = ?",[studentId], (error, results : any) =>{
                if(error){
                    console.error("Error en la consulta", error);
                    reject(error);
                    return;
                }
                resolve(results.affectedRows > 0);
                
            })
        })
    }

}