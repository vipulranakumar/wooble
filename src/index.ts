import { Server } from "./server";

let server = new Server().app;

let port = 5700;

server.listen(port, () => {
    console.log(`Wooble : PORT ${port}`);
});






