const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname,'secret-folder') // определяем путь к папке

fs.readdir(directory,{withFileTypes: true},(err,files)=>{// читаем директорию и получаем данные
    for (let file of files) { // перебираем объект
        if(file.isFile()) { // если содержимое == файл двигаемся дальше
            //console.log(file.name)
            fs.stat(directory + '/' + file.name, (err, stats) => {  // stat получает информацию о файле. Собираем и выводим в консоль
                console.log(path.parse(file.name).name + ' - '  + path.extname(file.name).replace('.','') + ' - ' + stats.size / 1000 + ' kb')
            })
        }
    }
})

