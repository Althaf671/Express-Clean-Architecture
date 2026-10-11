/**
 * Student Services
 * Bertanggung jawab untuk mengorkestrasi semua logika pembuatan, 
 * pengambilan, dan manipulasi student.
 *
  * NOTE: Hapus saja console.log() jika menganggu
 */

import { Database } from "../../infrastructures/persistances/database";
import { formatToJson } from "../common/helpers/string-extensions";
import { 
    TCreateStudentRequest, 
    TCreateStudentResponse, 
    TGetStudentLookupResponse 
} from "./student.contracts";
import { IStudentServices } from "./student.interfaces";

export class StudentService implements IStudentServices {
 
    // constructor menyimpan objek database
    public constructor (private readonly db: Database) {}

    /**
     *  Orkestrasi pembuatan objek student
     * 
     * @param data terima request data yang diteruskan controller
     * 
     * Alur:
     *  buat objek student dengan db.setItem
     *  karena kita mau buat pesan sukses dengan nama maka kita query untuk cek ke database
     * 
     * @returns JSON TCreateStudentResponse 
     */
    public async create(data: TCreateStudentRequest): Promise<TCreateStudentResponse> {
        console.log(`[Service-Create]: Aku terima request controller berupa: ${formatToJson(data)}`);

        const query = this.db.setItem(data);
        console.log(`[Service-Create]: Query database adalah: ${query} (true=sukses|false=gagal)`);

        const res = this.db.getItemByName(data.name);
        console.log(`[Service-Create]: Aku terima hasil query database berupa: ${formatToJson(res)}`);

        return { success: true, message: `Sukses membuat siswa dengan nama: ${res?.name}` };
    }

    /**
     * Orkestrasi pengambilan objek student dengan nama
     * 
     * @param name terima request data yang diteruskan controller
     * 
     * Alur:
     *  query item dengan nama yang sama
     *  jika kosong throw error
     * 
     * @returns JSON TGetStudentLookupResponse
     */
    public async getByName(name: string): Promise<TGetStudentLookupResponse> {
        console.log(`[Service-Create]: Aku terima request controller berupa: ${name}`);
        var res = this.db.getItemByName(name);
        if (res === undefined) throw new Error("Student tidak ditemukan");
        return { name: res.name, email: res.email }
    }

    /**
     * Orkestrasi pengambilan list objek student
     * 
     * Alur:
     *  query semua item di database
     * 
     * @returns JSON TGetStudentLookupResponse[]
     */
    public async getList(): Promise<TGetStudentLookupResponse[]> {
        console.log(`[Service-GetList]: Akan return isi database atau [] jika kosong`);
        return this.db.getAllItem();
    }
}