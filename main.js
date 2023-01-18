const path = require("path");
const { app, BrowserWindow } = require("electron");

const isDev = process.env.NODE_ENV !== "production";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "Gestion d'absence",
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if(isDev){
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
  mainWindow.maximize();
  mainWindow.show();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
