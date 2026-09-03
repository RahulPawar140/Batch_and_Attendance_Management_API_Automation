import axios from "axios";


// ============================================================
// GET USER BY ID
// ============================================================

export async function getUserById(
    endpoint: string
) {

    console.log(
        `\nAPI GET: ${endpoint}`
    );

    const response =
        await axios.get(endpoint);

    console.log(
        "\nGET User Response:"
    );

    console.log(
        JSON.stringify(
            response.data,
            null,
            2
        )
    );

    return response;
}


// ============================================================
// CREATE USER
// ============================================================

export async function createUser(
    endpoint: string,
    requestBody: any
) {

    console.log(
        `\nAPI POST: ${endpoint}`
    );

    console.log(
        "Request Body:",
        JSON.stringify(
            requestBody,
            null,
            2
        )
    );

    const response =
        await axios.post(
            endpoint,
            requestBody
        );

    console.log(
        "\nCREATE User Response:"
    );

    console.log(
        JSON.stringify(
            response.data,
            null,
            2
        )
    );

    return response;
}