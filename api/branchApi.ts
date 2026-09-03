import { ApiClient } from "../utils/apiClient";

export class BranchApi {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient();
    }

    // ----------------------------------------------------
    // GET BRANCH BY ID
    // ----------------------------------------------------

    public async getBranch(branchId: number) {

        return await this.apiClient.get(
            `/branch/get_branch/${branchId}`
        );
    }

    // ----------------------------------------------------
    // GET BRANCH LIST
    // ----------------------------------------------------

    public async getBranchList(params: {
        page_size: number;
        sort_order: string;
        page_index: number;
        sort_by: string;
        search_text: string;
    }) {

        return await this.apiClient.get(
            `/branch/get_branch_list/`,
            params
        );
    }

    // ----------------------------------------------------
    // CREATE BRANCH
    // ----------------------------------------------------

    public async createBranch(body: object) {

        return await this.apiClient.post(
            `/branch/create_branch/`,
            body
        );
    }

    // ----------------------------------------------------
    // UPDATE BRANCH
    // ----------------------------------------------------

    public async updateBranch(body: object) {

        return await this.apiClient.put(
            `/branch/update_branch/`,
            body
        );
    }

    // ----------------------------------------------------
    // DELETE BRANCH
    // ----------------------------------------------------

    public async deleteBranch(branchId: number) {

        return await this.apiClient.delete(
            `/branch/delete_branch/${branchId}`
        );
    }
}