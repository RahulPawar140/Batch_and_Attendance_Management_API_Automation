import { ApiClient } from "../utils/apiClient";

export class CourseApi {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient();
    }

    // ----------------------------------------------------
    // GET Course by ID
    // ----------------------------------------------------

    public async getCourse(courseId: number) {

        return await this.apiClient.get(
            `/courses/get_course/${courseId}`
        );
    }

    // ----------------------------------------------------
    // GET Course List
    // ----------------------------------------------------

    public async getCourseList(params: {
        page_size: number;
        sort_order: string;
        page_index: number;
        sort_by: string;
        search_text: string;
    }) {

        return await this.apiClient.get(
            `/courses/get_course_list/`,
            params
        );
    }

    // ----------------------------------------------------
    // POST Create Course
    // ----------------------------------------------------

    public async createCourse(body: object) {

        return await this.apiClient.post(
            `/courses/create_course/`,
            body
        );
    }

    // ----------------------------------------------------
    // PUT Update Course
    // ----------------------------------------------------

    public async updateCourse(body: object) {

        return await this.apiClient.put(
            `/courses/update_course/`,
            body
        );
    }

    // ----------------------------------------------------
    // DELETE Course
    // ----------------------------------------------------

    public async deleteCourse(courseId: number) {

        return await this.apiClient.delete(
            `/courses/delete_course/${courseId}`
        );
    }
}