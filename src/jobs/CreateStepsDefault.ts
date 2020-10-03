import "../config/LoaderEnvironmentVariable";
import connection from "../config/Database";

(async () => {
    const connectionDB = await connection;
    console.log("Initialize create steps.");
    await connectionDB?.collection("steps").insertMany([
        { field: "cpf", createdAt: new Date(), validation: "CpfValidator" },
        { field: "full-name", createdAt: new Date(), validation: "" },
        { field: "birth-day", createdAt: new Date(), validation: "" },
        { field: "phone-number", createdAt: new Date(), validation: "" },
        { field: "address", createdAt: new Date(), validation: "" }
    ]);
    console.log("Finished creation steps.");
})()