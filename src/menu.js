const { app, Menu } = require('electron');

const isMac = process.platform === 'darwin';

// Menu template
const menuTemplate = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        {
          label: 'О программе',
          submenu: [
          {
            label: 'Выход',
            click: () => app.quit(),
          }
      ]
        }
      ]
    }] : []),
  
    ...(!isMac ? [{
        label: 'Справка',
        submenu: [
        {
          label: 'О программе',
          click: () => {}  
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