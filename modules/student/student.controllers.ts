/**
 * Student Controller
 * Bertanggung jawab atas HTTP request-response
 * 
 * NOTE: Hapus saja console.log() jika menganggu
 */

import { Request, Response } from "express";
import { StudentService } from "./student.services";
import { TCreateStudentRequest } from "./student.contracts";
import { formatToJson } from "../common/helpers/string-extensions";

export class StudentController {

    // constructor menyimpan objek service
    public constructor(private readonly service: StudentService) {}

    /**
     * Controller meminta pembuatan objek student
     * 
     * @param req terima request HTTP
     * @param res balikan respon ke HTTP
     * 
     * Alur:
     *  ambil data dari request body
     *  validasi data dan throw error
     *  masukan data ke service.create() dan simpan hasil ke response
     * 
     * @returns status 201 dan JSON TCreateStudentResponse
     */
    public async create(req: Request, res: Response) {
        console.log(`[Controller-Create]: Memulai operasi...`);
        const data: TCreateStudentRequest = req.body;

        const response = await this.service.create(data)
        console.log(`[Controller-Create]: Aku terima hasil operasi service berupa: ${formatToJson(data)}`);
        console.log(`[Controller-Create]: Operasi selesai...`);

        return res.status(201).json(response);
    }

    /**
     * Controller menerima permintaan mengambil list objek student
     * 
     * @param res balikan respon ke HTTP
     * 
     * Alur:
     *  terima request dari query param dan cast ke string
     *  panggil service.getList() dan simpan hasil ke response 
     * 
     * @returns status 200 dan JSON TGetStudentLookupResponse[]
     */
    public async getByName(req: Request, res: Response) {
        console.log(`[Controller-GetByName]: Memulai operasi...`);
        const name = req.query.name as string;

        const response = await this.service.getByName(name);
        console.log(`[Controller-GetMyName]: Aku terima hasil operasi service berupa: ${formatToJson(response)}`);
        console.log(`[Controller-GetByName]: Operasi selesai...`);

        return res.status(200).json(response);
    }

    /**
     * Controller menerima permintaan mengambil list objek student
     * 
     * @param res balikan respon ke HTTP
     * 
     * Alur:
     *  panggil service.getList() dan simpan hasil ke response 
     * 
     * @returns status 200 dan JSON TGetStudentLookupResponse[]
     */
    public async getAll(req: Request, res: Response) {
        console.log(`[Controller-GetList]: Memulai operasi...`);
        const response = await this.service.getList();
        console.log(`[Controller-GetList]: Aku terima hasil operasi service berupa: ${formatToJson(response)}`);
        console.log(`[Controller-GetByName]: Operasi selesai...`);

        return res.status(200).json(response);
    }
}