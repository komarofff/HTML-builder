const fs = require('fs')
const path = require('path')
const output = fs.createWriteStream(path.join(__dirname, 'writeText.txt')) // определяем записываемый файл , если его нет он создается
const {stdin, stdout} = process
stdout.write('Hi! Write text (to finish write exit or press CTR+C) : \n') // выводим приветствие
stdin.on('data', data => { // ждем ввод текста в консоли
    let text = data.toString().trim() //  получаемый текст приводим в строку и удаляем пробелы в конце и начале строки
    if (text !== 'exit') { //  если не exit
        output.write(data) //  записываем в наш файл полученные данные
    } else if (text === 'exit') { //  если написали exit
        process.exit() //  выходим
    }
})
process.on('exit', () => stdout.write('God luck!\n')) //  когда выходим пишем прощание
process.on('SIGINT', () => { // если нажали CTR+C  - выход
       process.exit()
})