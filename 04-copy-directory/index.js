const fs = require('fs')
const path = require('path')
const startDirectory = path.join(__dirname, 'files') // source directory
const finishDirectory = path.join(__dirname, 'files-copy') // destination directory

fs.stat(finishDirectory, function (err) { // проверяем есть ли destination directory
    if (!err) { // если есть , то запускаем ассинхронную функцию по удалению файлов из дериктории и самой дериктории
        (async function () {
            await fs.readdir(finishDirectory, (err, files) => { // читаем папку
                if (!err) {
                    for (let i = 0; i < files.length; i++) {
                        fs.unlink(finishDirectory + "/" + files[i], (err) => { // удаляем файлы
                            if (err) console.log(err)
                        })
                    }
                    fs.rmdir(finishDirectory, () => {}) // удаляем папку
                     fs.promises.mkdir(finishDirectory, {recursive: true})
                    copyFiles() // запускаем функцию создания папки заново и копирования файлов
                }
            })
        })()

    } else if (err.code === 'ENOENT') { // если папки нет -  запускаем функцию создания папки заново и копирования файлов
        copyFiles()
    }
});

async function copyFiles() {
    await fs.promises.mkdir(finishDirectory, {recursive: true}) // создаем папку назначения
    const files = await fs.promises.readdir(startDirectory,{withFileTypes: true}) // читаем папку исходник
    for (let file of files) {
        if(file.isFile()) {
            await fs.copyFile(path.join(startDirectory, file.name), path.join(finishDirectory, file.name),()=>{}) // копируем файлы
        }
     }
}
