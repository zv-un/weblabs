import express from "express";
import os from "os";
import http from "http";
import fs from "fs";

import packageJson from "../package.json" assert { type: "json" };

const router = express.Router();

const myInfo = {
  fullName: "Зарецький Володимир Сергійович",
  groupNumber: "8.1222",
  subject: "Сучасні методи Web-програмування",
};

const info = {
  package: packageJson,
  os,
};

info.package.dependencies = Object.keys(packageJson.dependencies).join(", ");
const osFunctions = [
  "cpus",
  "freemem",
  "hostname",
  "loadavg",
  "platform",
  "release",
  "totalmem",
  "type",
  "uptime",
];
for (const fn of osFunctions) {
  info.os[fn] = os[fn]();
}

info.os.loadavg.forEach(function (l, i, loadavg) {
  loadavg[i] = l.toFixed(2);
});
info.os.loadavg = info.os.loadavg.join(" ");
info.os.freemempercent = Math.round((info.os.freemem / info.os.totalmem) * 100);

const cpus = { model: {}, speed: {} };
info.os.cpu = {
  model: "",
  speed: "",
};

for (let c = 0; c < os.cpus.length; c++) {
  cpus.model[os.cpus[c].model] = (cpus.model[os.cpus[c].model] || 0) + 1;
  cpus.speed[os.cpus[c].speed] = (cpus.speed[os.cpus[c].speed] || 0) + 1;
}

for (const p in cpus.model) info.os.cpu.model = cpus.model[p] + " × " + p;
for (const p in cpus.speed)
  info.os.cpu.speed += cpus.speed[p] + " × " + p + "; ";

// everything from process (for process memory and Node versions)
info.process = process;

info.process.rss = process.memoryUsage().rss;
info.process.heapTotal = process.memoryUsage().heapTotal;
info.process.heapUsed = process.memoryUsage().heapUsed;

info.intlTimezone = Intl.DateTimeFormat("en").resolvedOptions().timeZone;

info.dateTzOffset = Date().match(/([A-Z]+[\+-][0-9]{4}.*)/)[1];

router.get("/", function (req, res, next) {
  if (req.headers) {
    const protocol =
      req.socket.encrypted || req.headers["x-forwarded-proto"] == "https"
        ? "https"
        : "http";
    info.request = req;

    info.request.href = protocol + "://" + req.headers.host + req.url;
    const remoteAddr =
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    const ipAddr = req.headers["x-forwarded-for"]
      ? `${req.headers["x-forwarded-for"]} via ${remoteAddr}`
      : remoteAddr;
    info.request.ip_addr = ipAddr;
  }

  res.render("index", { title: "Express", ...myInfo, ...info });
});

router.get("/lab4", (req, res) => {
  const mod = req.query.mod;
  const module = mod ? "lab4/modules/" + mod : "lab4";

  res.render(module, { title: "Lab4 website", content: "column content" });
});

export default router;
