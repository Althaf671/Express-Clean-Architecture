/**
 * Scholarship Controller
 * Bertanggung jawab atas HTTP request-response
 */

import { ScholarshipService } from "./scholarship.service";

export class ScholarshipController {

    constructor(private readonly service: ScholarshipService) {}

    /**
     * 
     */
    public async create(req: Request, res: Response) {}

    /**
     * 
     */
    public async update(req: Request, res: Response) {}

    /**
     * 
     */
    public async delete(req: Request, res: Response) {}

    /**
     * 
     */
    public async getById(req: Request, res: Response) {}

    /**
     * 
     */
    public async getAll(req: Request, res: Response) {}

    /**
     * 
     */
    public async createCategory(req: Request, res: Response) {}

    /**
     * 
     */
    public async updateCategory(req: Request, res: Response) {}

    /**
     * 
     */
    public async deleteCategory(req: Request, res: Response) {}

    /**
     * 
     */
    public async getCategoryById(req: Request, res: Response) {}

    /**
     * 
     */
    public async getAllCategory(req: Request, res: Response) {}
}