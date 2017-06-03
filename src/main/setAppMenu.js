import { app, Menu } from "electron";
import createWindow from "./createWindow";

function setAppMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        { label: "New Window", accelerator: "CmdOrCtrl+N", click: createWindow },
        { type: "separator" },
        { label: "Close", accelerator: "CmdOrCtrl+W", role: "close"}
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" }
      ]
    })
  }

  const appMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(appMenu);
}

export default setAppMenu;
