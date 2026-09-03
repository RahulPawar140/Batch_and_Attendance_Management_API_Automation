import axios, {
    AxiosInstance,
    AxiosError
} from "axios";

import { config } from "./config";

export class ApiClient {

    private client: AxiosInstance;

    constructor() {

        // ========================================================
        // CREATE AXIOS CLIENT
        // ========================================================

        this.client = axios.create({

            // Base URL from config
            baseURL: config.baseUrl,

            // Maximum API response wait time
            timeout: 30000,

            // Default headers
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    }

    // ============================================================
    // GET REQUEST
    // ============================================================

    public async get(
        endpoint: string,
        params?: object
    ) {

        console.log(
            `\nAPI GET: ${this.client.defaults.baseURL}${endpoint}`
        );

        // Print query parameters if available
        if (params) {

            console.log(
                "Query Parameters:",
                JSON.stringify(
                    params,
                    null,
                    2
                )
            );
        }

        try {

            // Send GET request
            const response =
                await this.client.get(
                    endpoint,
                    {
                        params
                    }
                );

            return response;

        } catch (error) {

            // Print API error details
            this.printApiError(error);

            // Re-throw error so Cucumber can fail the test
            throw error;
        }
    }

    // ============================================================
    // POST REQUEST
    // ============================================================

    public async post(
        endpoint: string,
        body?: object
    ) {

        console.log(
            `\nAPI POST: ${this.client.defaults.baseURL}${endpoint}`
        );

        console.log(
            "Request Body:",
            JSON.stringify(
                body,
                null,
                2
            )
        );

        try {

            // Send POST request
            const response =
                await this.client.post(
                    endpoint,
                    body
                );

            return response;

        } catch (error) {

            // Print API error details
            this.printApiError(error);

            // Re-throw error
            throw error;
        }
    }

    // ============================================================
    // PUT REQUEST
    // ============================================================

    public async put(
        endpoint: string,
        body?: object
    ) {

        console.log(
            `\nAPI PUT: ${this.client.defaults.baseURL}${endpoint}`
        );

        console.log(
            "Request Body:",
            JSON.stringify(
                body,
                null,
                2
            )
        );

        try {

            // Send PUT request
            const response =
                await this.client.put(
                    endpoint,
                    body
                );

            return response;

        } catch (error) {

            // Print API error details
            this.printApiError(error);

            // Re-throw error
            throw error;
        }
    }

    // ============================================================
    // DELETE REQUEST
    // ============================================================

    public async delete(
        endpoint: string
    ) {

        console.log(
            `\nAPI DELETE: ${this.client.defaults.baseURL}${endpoint}`
        );

        try {

            // Send DELETE request
            const response =
                await this.client.delete(
                    endpoint
                );

            return response;

        } catch (error) {

            // Print API error details
            this.printApiError(error);

            // Re-throw error
            throw error;
        }
    }

    // ============================================================
    // API ERROR HANDLER
    // ============================================================

    private printApiError(
        error: unknown
    ) {

        // Check whether the error came from Axios
        if (axios.isAxiosError(error)) {

            const axiosError =
                error as AxiosError;

            console.log(
                "\n========================================"
            );

            console.log(
                "API REQUEST FAILED"
            );

            console.log(
                "========================================"
            );

            // Axios error code
            console.log(
                "Error Code:",
                axiosError.code
            );

            // Error message
            console.log(
                "Error Message:",
                axiosError.message
            );

            // Request URL
            console.log(
                "Request URL:",
                axiosError.config?.url
            );

            // HTTP method
            console.log(
                "Request Method:",
                axiosError.config?.method?.toUpperCase()
            );

            // If server returned a response
            if (axiosError.response) {

                console.log(
                    "HTTP Status:",
                    axiosError.response.status
                );

                console.log(
                    "Response:",
                    JSON.stringify(
                        axiosError.response.data,
                        null,
                        2
                    )
                );
            }

            console.log(
                "========================================\n"
            );

        } else {

            // Handle non-Axios errors
            console.log(
                "\nUnknown API Error:",
                error
            );
        }
    }
}