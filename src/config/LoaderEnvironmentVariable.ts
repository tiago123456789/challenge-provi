import dotenv from "dotenv";

const getPathDotenv = () => {
    const env = process.env.NODE_ENV;
    if (env == "testing") {
        return ".env.testing";
    }

    return ".env";
}

console.log(getPathDotenv());
// Loading environment variables
dotenv.config({ path: getPathDotenv() });