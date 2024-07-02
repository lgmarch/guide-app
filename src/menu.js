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
              click: () => app.quit(),
            },
          ] 
        },
        {
            label: 'Update',
            submenu: [{
                label: 'Сhecking for updates',
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
            click: () => app.quit(),
        },
        ],
      },
      {
        label: 'Update',
        submenu: [{
            label: 'Сhecking for updates',
            click: async () => {},
        }]
      },
    ] : []),
  ];

module.exports.menu = Menu.buildFromTemplate(menuTemplate);