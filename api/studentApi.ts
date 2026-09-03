import { ApiClient } from "../utils/apiClient";

export class StudentApi {

    private apiClient: ApiClient;

    constructor() {

        // Initialize API client
        this.apiClient = new ApiClient();
    }

    // ============================================================
    // GET STUDENT BY ID
    // ============================================================

    async getStudent(
        studentId: number
    ) {

        // Send GET request to get a student by ID
        return await this.apiClient.get(
            `/students/get_student/${studentId}`
        );
    }

    // ============================================================
    // GET STUDENT LIST
    // ============================================================

    async getStudentList(
        params: {
            page_index: number;
            page_size: number;
            sort_by: string;
            sort_order: string;
            search_text: string | number;
        }
    ) {

        // Send GET request with query parameters
        return await this.apiClient.get(
            `/students/get_student_list/`,
            params
        );
    }

    // ============================================================
    // CREATE STUDENT
    // ============================================================

    async createStudent(
        data: any
    ) {

        // Send POST request to create a student
        return await this.apiClient.post(
            `/students/create_student/`,
            data
        );
    }

    // ============================================================
    // DELETE STUDENT
    // ============================================================

    async deleteStudent(
        studentId: number
    ) {

        // IMPORTANT:
        // Postman confirms that the correct DELETE endpoint is:
        //
        // /students/delete_student/{studentId}
        //
        // NOT:
        // /users/delete_user/{studentId}

        const endpoint =
            `/students/delete_student/${studentId}`;

        console.log(
            `\nDeleting Student through endpoint: ${endpoint}`
        );

        // Send DELETE request
        return await this.apiClient.delete(
            endpoint
        );
    }
}