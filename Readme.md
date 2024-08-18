https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

https://github.com/electron-userland/electron-builder?tab=readme-ov-file


# Запуск программы
`npm start`

# Запуск программы в режиме разработки (DevTools)
`
npm install --save-dev electronmon
npx electronmon .
`
# Упаковка приложения
`npm install --save-dev @electron-forge/cli`

`npx electron-forge import`
`npm run make`
В папке out находятся исходники

Создиние загрузочного приложения (из консоли с правами администратора):
`npm run build`

# Создание обновления
Настройка репозитория на проект:
## Создаем Releases на GitHub.
## Создаем Release
`npm run dist`
Внимание! В файлах релиза должен отсутствовать пробел.
## Копируем туда файлы.


