const fs = require("fs");
const WebSocket = require("ws");

const JS_FILE_PATH =
  "/Users/bebiks/Documents/GitHub/EvenBetterExtensions/final/index.js";
const CSS_FILE_PATH =
  "/Users/bebiks/Documents/GitHub/EvenBetter/final/style.css";

const wss = new WebSocket.Server({ port: 8081 });

const EVENT_TYPES = {
  LOAD_JS: "caido:loadJS",
  LOAD_CSS: "caido:loadCSS",
  RELOAD: "caido:reload",
};

const sendWebSocketMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return null;
  }
};

const sendEvent = async (eventType, data) => {
  const message = JSON.stringify({ event: eventType, data });
  sendWebSocketMessage(message);

  console.log(`Sent event: ${eventType}`);
};

const previousFileContent = {};
const handleFileChange = (filePath) => {
    const currentFileContent = readFile(filePath);
  
    if (currentFileContent === null || currentFileContent === previousFileContent[filePath]) {
      return;
    }
  
    previousFileContent[filePath] = currentFileContent;
  
    if (filePath === JS_FILE_PATH) {
      console.log("JS file changed. Reloading bundle...");
      sendEvent(EVENT_TYPES.LOAD_JS, currentFileContent);
    } else if (filePath === CSS_FILE_PATH) {
      console.log("CSS file changed. Reloading CSS...");
      sendEvent(EVENT_TYPES.LOAD_CSS, currentFileContent);
    }
  
    setTimeout(() => {
      sendEvent(EVENT_TYPES.RELOAD);
    }, 100);
  };
  

[JS_FILE_PATH, CSS_FILE_PATH].forEach((path) => {
  fs.watch(
    path,
    {
      persistent: true,
      recursive: false,
    },
    () => handleFileChange(path)
  );
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
