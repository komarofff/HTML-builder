const fs = require('fs')
const path = require('path')
const styles = path.join(__dirname, 'styles') // папка стилей
const distFolder = path.join(__dirname, 'project-dist') // папка назначения
const distFile = path.join(distFolder, 'bundle.css'); // файл в который собираем все стили
fs.readdir(styles, (err, files) => { // читаем папку стилей
    for (let i = 0; i < files.length; i++) {// перебираем файлы
        if (path.extname(files[i]) === '.css') { // если расширение css
            fs.readFile(styles + '/' + files[i], 'utf-8', (err, style) => { // читаем файл и его данные в формате utf-8
                fs.appendFile(distFile, style, () => { //данные последовательно сохраняем в файл назначения (каждую новую запись в конец файла)
                })
            })
        }
    }
})
