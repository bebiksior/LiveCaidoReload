#! /usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import { WebSocketServer } from "ws";
import crypto from "crypto";
import path from "path";
import chokidar from "chokidar";
const __dirname = path.resolve();

const pluginZipPath = process.argv[2];

const wss = new WebSocketServer({ port: 8081 });

const createMD5 = async (filePath) => {
  return new Promise((res, rej) => {
    const hash = crypto.createHash("md5");

    const rStream = fs.createReadStream(filePath);
    rStream.on("data", (data) => {
      hash.update(data);
    });
    rStream.on("end", () => {
      res(hash.digest("hex"));
    });
  });
};


const sendEvent = async (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });

  console.log(chalk.green(`Sent event to clients`));
};

let previousFileHash = "";
const handleFileChange = async (filePath) => {
  const currentFileHash = await createMD5(filePath)
  if (currentFileHash === previousFileHash)
    return;

  previousFileHash = currentFileHash;

  if (filePath.endsWith(".zip")) {
    console.log(chalk.yellow("Detected plugin zip file change"));
    const filePath = path.join(__dirname, 'plugin.zip');
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('data', (chunk) => {
      console.log(chalk.green("Sending chunk"));
      sendEvent(chunk);
    });
    fileStream.on('end', () => {
      sendEvent(JSON.stringify({ end: true }));
    });
  }
};

const files = [];
if (pluginZipPath) {
  files.push(pluginZipPath);
} else {
  files.push(...fs.readdirSync(process.cwd()));
}

if (!files.length) {
  console.log(chalk.red("No files found."));
  process.exit(1);
}

files.forEach((path) => {
  if (!fs.existsSync(path)) {
    console.log(chalk.red(`File not found: ${path}`));
    process.exit(1);
  }
});

const currentDir = process.cwd();
chokidar.watch(currentDir).on('all', (event, path) => {
    if (event !== "change") return;

    const fileName = path.split("/").pop();
    if (files.includes(fileName)) {
      handleFileChange(fileName);
    }
  }
);

wss.on("connection", (ws) => {
  console.log(chalk.green("Client connected"));

  ws.on("close", () => {
    console.log(chalk.red("Client disconnected"));
  });
});

console.log(
  chalk.green("Live reload server started on"),
  chalk.blue("ws://localhost:8081")
);
console.log(chalk.green("Watching files:"));
files.forEach((file) => {
  let output = chalk.green(`- ${file}`);
  if (file.endsWith(".zip")) {
    output += chalk.yellow(" (PLUGIN ZIP)");
  } else {
    output += chalk.red(" (Unsupported)");
  }

  console.log(output);
});
console.log(
  chalk.yellow(
    "Make sure you have installed LiveCaidoReloadPlugin in your Caido instance. Good luck!"
  )
);