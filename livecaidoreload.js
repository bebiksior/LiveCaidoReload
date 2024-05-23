#! /usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import { WebSocketServer } from "ws";

const jsPath = process.argv[2];
const cssPath = process.argv[3];

const wss = new WebSocketServer({ port: 8081 });

const EVENT_TYPES = {
  LOAD_JS: "caido:loadJS",
  LOAD_CSS: "caido:loadCSS",
};

const sendWebSocketMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      // WebSocket.OPEN
      client.send(message);
    }
  });
};

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.log(chalk.red(`Error reading file: ${filePath}`));
    return null;
  }
};

const sendEvent = async (eventType, data) => {
  const message = JSON.stringify({ event: eventType, data });
  sendWebSocketMessage(message);

  console.log(chalk.green(`Sent event ${eventType} to clients`));
};

const previousFileContent = {};
const handleFileChange = (filePath) => {
  const currentFileContent = readFile(filePath);
  if (
    currentFileContent === null ||
    currentFileContent === previousFileContent[filePath]
  ) { 
    return;
  }

  previousFileContent[filePath] = currentFileContent;

  if (filePath.endsWith(".js")) {
    console.log(chalk.yellow("JS file changed. Reloading JS..."));
    sendEvent(EVENT_TYPES.LOAD_JS, currentFileContent);
  } else if (filePath.endsWith(".css")) {
    console.log(chalk.yellow("CSS file changed. Reloading CSS..."));
    sendEvent(EVENT_TYPES.LOAD_CSS, currentFileContent);
  } else {
    console.log(chalk.red("Unsupported file type changed. Ignoring..."));
    return;
  }
};

const files = [];
if (jsPath || cssPath) {
  if (jsPath) {
    files.push(jsPath);
  }

  if (cssPath) {
    files.push(cssPath);
  }
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
fs.watch(
  currentDir,
  {
    persistent: true,
    recursive: true,
  },
  (event, fileName) => {
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
  if (file.endsWith(".js")) {
    output += chalk.yellow(" (JS)");
  } else if (file.endsWith(".css")) {
    output += chalk.yellow(" (CSS)");
  } else {
    output += chalk.red(" (Unsupported)");
  }

  console.log(output);
});
console.log(
  chalk.yellow("Make sure your plugin has"),
  chalk.green("EvenBetterAPI.hotReloading()"),
  chalk.yellow("in your plugin's main file to enable hot reloading.")
);
