const fs = require('fs')
const path = require('path')
const startDirectory = path.join(__dirname, 'files') // source directory
const finishDirectory = path.join(__dirname, 'files-copy') // destination directory
fs.stat(finishDirectory, function (err) { // проверяем есть ли destination directory
    if (!err) { // если есть , то запускаем функцию по удалению файлов из дериктории и самой дериктории
             fs.readdir(finishDirectory, (err, files) => { // читаем папку
                if (!err) {
                    for (let i = 0; i < files.length; i++) {
                        fs.unlink(finishDirectory + "/" + files[i], (err) => { // удаляем файлы
                            if (err) console.log(err)
                        })
                    }
                    fs.rmdir(finishDirectory,()=>{}) // удаляем папку
                    copyFiles() // запускаем функцию создания папки заново и копирования файлов
                }
            })


    } else if (err.code === 'ENOENT') { // если папки нет -  запускаем функцию создания папки заново и копирования файлов
        copyFiles()
    }
})

function copyFiles() {
  fs.mkdir(finishDirectory, {recursive: true},(err)=>{ // создаем папку назначения
      if(!err){
          fs.readdir(startDirectory, (err, files) => { // читаем папку исходник
              for (let i = 0; i < files.length; i++) {
                 fs.copyFile(path.join(startDirectory, files[i]), path.join(finishDirectory, files[i]),()=>{}) // копируем файлы
              }
          })
      }
  })

}
