import { ApiClient } from "../utils/apiClient";

export class BatchApi {

    private apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient();
    }

    // ----------------------------------------------------
    // GET BATCH BY ID
    // ----------------------------------------------------

    public async getBatch(batchId: number) {

        return await this.apiClient.get(
            `/batches/get_batch/${batchId}`
        );
    }

    // ----------------------------------------------------
    // GET BATCHES LIST
    // ----------------------------------------------------

    public async getBatchesList(params: {
        page_index: number;
        page_size: number;
        sort_by: string;
        sort_order: string;
        search_text: string;
    }) {

        return await this.apiClient.get(
            `/batches/get_batches_list/`,
            params
        );
    }

    // ----------------------------------------------------
    // CREATE BATCH
    // ----------------------------------------------------

    public async createBatch(body: object) {

        return await this.apiClient.post(
            `/batches/create_batch/`,
            body
        );
    }

    // ----------------------------------------------------
    // UPDATE BATCH
    // ----------------------------------------------------

    public async updateBatch(body: object) {

        return await this.apiClient.put(
            `/batches/update_batch/`,
            body
        );
    }

    // ----------------------------------------------------
    // DELETE BATCH
    // ----------------------------------------------------

    public async deleteBatch(batchId: number) {

        return await this.apiClient.delete(
            `/batches/delete_batch/${batchId}`
        );
    }
}