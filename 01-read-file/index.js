// const fs = require('fs')// подключаем модуль для работы с файлами и папками
// const path = require('path') // подключаем модуль для работы с путями (имена файлов, директорий, расширения)
// fs.readFile( // запускаем чтение
//     path.join(__dirname, 'text.txt'), // определяем имя читаемого файла (Конкатенация путей)
//     'utf-8',// ставим кодировку
//     (err, data) => { // используем асинхронный метод
//         if (err) throw err // при ошибке возвращаем error
//         console.log(data) // если нет ошибки - выводим данные
//     }
// )
// через ReadStream
const fs = require('fs')
const path = require('path')
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8')
let data = ''
stream.on('data', chunk => data += chunk)
stream.on('end', () => console.log(data))
stream.on('error', error => console.log('Error', error.message))