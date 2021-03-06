const net = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log("starting electron");
      startedElectron = true;
      const exec = require("child_process").exec;
      exec("yarn start");
    }
  });

tryConnection();

client.on("error", () => {
  setTimeout(tryConnection, 1000);
});
