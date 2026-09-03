import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
    throw new Error("BASE_URL is not defined in .env file");
}

export const config = {
    baseUrl
};