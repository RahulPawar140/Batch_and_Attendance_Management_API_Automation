import { ApiClient } from "../utils/apiClient";

export class FacultyApi {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient();
    }

    // ============================================================
    // GET FACULTY BY ID
    // ============================================================

    public async getFaculty(facultyId: number) {

        return await this.apiClient.get(
            `/faculties/get_faculty/${facultyId}`
        );
    }

    // ============================================================
    // GET FACULTY LIST
    // ============================================================

    public async getFacultyList(params: {
        page_index: number;
        page_size: number;
        sort_by: string;
        sort_order: string;
        search_text: string;
    }) {

        return await this.apiClient.get(
            `/faculties/get_faculty_list/`,
            params
        );
    }

    // ============================================================
    // CREATE FACULTY
    // ============================================================

    public async createFaculty(body: object) {

        return await this.apiClient.post(
            `/faculties/create_faculty/`,
            body
        );
    }

    // ============================================================
    // DELETE FACULTY
    // ============================================================

    public async deleteFaculty(facultyId: number) {

        return await this.apiClient.delete(
            `/faculties/delete_faculty/${facultyId}`
        );
    }
}