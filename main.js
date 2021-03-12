const { app, BrowserWindow, Menu, dialog } = require('electron')
const fs = require('fs');

function createWindow () {
  win = new BrowserWindow({
    width: 1600,
    height: 950,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html');

  let menuSet = [{
      label: 'File',
      submenu: [
          {
            label: 'Open File',
            accelerator: 'CmdOrCtrl+O',
            click(){
              openFile();
            }
          },
          {
            label: 'Exit',
            click(){
              app.quit();
            }
          }
      ]
  }];

  const menu = Menu.buildFromTemplate(menuSet);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// Open File
function openFile(){
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'All Files', 
      extensions:['*']
    }]
  });
  if(!files) return;

  const file = files[0];
  const fileContent = fs.readFileSync(file).toString();
  console.log(fileContent);
}