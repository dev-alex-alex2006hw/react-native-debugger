import { resolve } from 'path';
import { app, BrowserWindow, Menu } from 'electron';
import { startListeningHandleURL } from './url-handle';
import { createContextMenu, createMenuTemplate } from './menu';

const iconPath = resolve(__dirname, 'logo.png');
let mainWindow = null;

startListeningHandleURL(() => mainWindow);

app.on('window-all-closed', () => app.quit());
app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 750, show: false });
  createContextMenu(mainWindow);

  mainWindow.loadURL(`file://${resolve(__dirname)}/app.html`);
  mainWindow.openDevTools();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuTemplate = createMenuTemplate(mainWindow, iconPath);
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
