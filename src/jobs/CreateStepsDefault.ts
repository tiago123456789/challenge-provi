import "../config/LoaderEnvironmentVariable";
import connection from "../config/Database";

(async () => {
    const connectionDB = await connection;
    console.log("Initialize create steps.");
    await connectionDB?.collection("steps").insertOne(
        { field: "cpf", createdAt: new Date(), validation: "CpfValidator" }
    );
    await connectionDB?.collection("steps").insertOne(
        { field: "full-name", createdAt: new Date(), validation: "" }
    );
    await connectionDB?.collection("steps").insertOne(
        { field: "birth-day", createdAt: new Date(), validation: "BirthDayValidator" }
    );
    await connectionDB?.collection("steps").insertOne(
        { field: "phone-number", createdAt: new Date(), validation: "" }
    );
    await connectionDB?.collection("steps").insertOne(
        { field: "address", createdAt: new Date(), validation: "AddressValidator" },
    );
    await connectionDB?.collection("steps").insertOne(
        { field: "personal-documents", createdAt: new Date(), validation: "" }
    );
    await connectionDB?.collection("steps").insertOne(
        { field: "amount-requested", createdAt: new Date(), validation: "" }
    );
    console.log("Finished creation steps.");
    process.exit(0);
})()