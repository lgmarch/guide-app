const path = require('path');
const { BrowserWindow } = require('electron');

// Create Aboot Window
const createAboutWindow = () => {
    const filePathToAboutHtml = path.resolve(__dirname, '..', 'public', 'about.html');
    console.log(filePathToAboutHtml);
  
    const aboutWindow = new BrowserWindow({
      title: 'About MZTA Help',
      width: 500,
      height: 400,
    });
  
    aboutWindow.setMenuBarVisibility(false);
    aboutWindow.loadFile(filePathToAboutHtml);
  };

  module.exports = { createAboutWindow };