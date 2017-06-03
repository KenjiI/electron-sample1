import { BrowserWindow } from "electron";
const {app, Menu, Tray} = require('electron')
const path = require('path');

let win;
let tray;

function createWindow() {
  win = new BrowserWindow({width: 500, height: 650})
  win.loadURL(`file://${__dirname}/../../index.html`);

  // Implements for tray
  const iconPath = path.join(__dirname, '../../images/tray.png');
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate(
    [
      { label: 'Show App', click: () => {win.show();}},
      { label: 'Quit', click:  () => {app.isQuiting = true; app.quit();}}
    ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip(app.getName());
  win.on('minimize', (event) => {
    event.preventDefault();
    win.hide();
  });
  win.on('close', (event) => {
    if( !app.isQuiting){
      event.preventDefault();
      win.hide();
    }
    return false;
  });
}

export default createWindow;
