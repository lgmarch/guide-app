const { app, Menu } = require('electron');
const { createAboutWindow } = require('./about-window');

const isMac = process.platform === 'darwin';

// Menu template
const menuTemplate = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        {
          label: 'Справка',
          submenu: [
            {
              label: 'О программе',
              click: createAboutWindow,
            },
            { type: 'separator' },
            {
              label: 'Выход',
              accelerator: 'Alt+Cmd+Q',
              click: () => app.quit(),
            },
          ] 
        },
        {
            label: 'Update',
            submenu: [{
                label: 'Updates',
                // Send to main
                click: async () => {},
            }]
          },
      ]
    }] : []),
  
    ...(!isMac ? [{
        label: 'Справка',
        submenu: [
        {
          label: 'О программе',
          click: createAboutWindow,
        },
        { type: 'separator' },
        {
            label: 'Выход',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+Q' : 'Alt+Shift+Q',
            click: () => app.quit(),
        },
        ],
      },
      {
        label: 'Update',
        submenu: [{
            label: 'Updates',
            accelerator: 'Alt+Shift+U',
            // Send to main
            click: () => { 
              app.emit('update');
            },
        }]
      },
    ] : []),
  ];

module.exports.menu = Menu.buildFromTemplate(menuTemplate);