import { ApiClient } from "../utils/apiClient";

export class ManagerApi {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient();
    }

    // ============================================================
    // GET MANAGER BY ID
    // ============================================================

    async getManagerById(managerId: number) {

        const endpoint =
            `/manager/get_manager/${managerId}?page_index=1&page_size=5&sort_by=id&sort_order=ASC&search_text=9963214623`;

        return await this.apiClient.get(endpoint);
    }

    // ============================================================
    // GET MANAGER LIST
    // ============================================================

    async getManagerList(params: Record<string, any>) {

        const queryString = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [
                key,
                String(value)
            ])
        ).toString();

        const endpoint =
            `/manager/get_manager/1?${queryString}`;

        return await this.apiClient.get(endpoint);
    }

    // ============================================================
    // DELETE MANAGER
    // ============================================================

    async deleteManager(managerId: number) {

        const endpoint =
            `/manager/delete_manager/${managerId}`;

        return await this.apiClient.delete(endpoint);
    }

    // ============================================================
    // GET MANAGER AFTER DELETE
    // ============================================================

    async getDeletedManager(managerId: number) {

        const endpoint =
            `/manager/get_manager/${managerId}`;

        return await this.apiClient.get(endpoint);
    }
}