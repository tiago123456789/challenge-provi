import express, { Request, Response } from "express";

const app = express();

app.get("/greewtins", (request: Request, response: Response) => {
    return response.status(200).json({ msg: "Hi, world!!!" }); 
});

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log("Server running in address: http://localhost:3000");
});