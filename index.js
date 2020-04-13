const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { log, ExpressAPILogMiddleware } = require("@rama41222/node-logger");

const config = {
  name: "sample-express-app",
  port: 3000,
  host: "0.0.0.0",
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

app.set("trust proxy", function (ip) {
  if (ip === "127.0.0.1" || ip === "172.31.0.1") return true;
  // trusted IPs
  else return false;
});

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/getip", (req, res) => {
  const corsHandler = cors({ origin: true });
  const ipCalc =
    (req.headers["x-forwarded-for"] || "").split(",").pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const data = {
    ip: req.ip,
    ips: req.ips,
    ipCalc,
  };
  return corsHandler(req, res, function () {
    return res.json(data);
  });
});

app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
