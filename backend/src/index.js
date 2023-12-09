import dotenv from "dotenv";

import Connection from "./database/db.js";
import { app } from "./app.js";
import DefaultData from "./default.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8000;

Connection()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
    })
    app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
})
.catch((error) => {
    console.log("mongoDB connection failed !!! ", error);
});

DefaultData();









