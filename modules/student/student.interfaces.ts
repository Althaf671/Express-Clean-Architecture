/**
 * Student Interfaces
 * Untuk kontrak kelas pada service
 */

import { 
    TCreateStudentRequest, 
    TCreateStudentResponse, 
    TGetStudentLookupResponse
} from "./student.contracts";

/**
 * Interface ini mewajibkan class yang implement untuk 
 * mengimplementasikan method serta input param dan return type yang didefenisikan
 */
export interface IStudentServices {
    create(data: TCreateStudentRequest): Promise<TCreateStudentResponse>,
    getByName(name: string): Promise<TGetStudentLookupResponse>,
    getList(): Promise<TGetStudentLookupResponse[]>
}