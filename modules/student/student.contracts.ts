/**
 * Student API Contract
 * Untuk HTTP contract data maupun contract data internal
 */

// deklarasi tipe respon
export type TCreateStudentResponse = {
    success: boolean;
    message: string;
}

export type TGetStudentLookupResponse = {
    name: string;
    email: string;
};

// deklarasi tipe request
export type TCreateStudentRequest = {
    name: string;
    email: string;
}