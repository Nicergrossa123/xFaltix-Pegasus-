const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const MainScreen = require("./screens/main/mainScreen");
const Globals = require("./globals");
const { autoUpdater, AppUpdater } = require("electron-updater");
const axios = require('axios');
 
let curWindow;

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  curWindow = new MainScreen();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  curWindow.showMessage(`Überprüfen auf Updates`);
});


autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update verfügbar`);
  let pth = autoUpdater.downloadUpdate();
  curWindow.showMessage(pth);
});

ipcMain.on('close', () => {
  app.quit()
})
autoUpdater.on("update-not-available", (info) => {
  curWindow.showMessage(`Kein Update verfügbar. Aktuelle Version : ${app.getVersion()}`);
});


autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info);
});





process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});