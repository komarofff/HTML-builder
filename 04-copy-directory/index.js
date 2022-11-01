const promises = require('fs/promises');
const fs = require('fs');
const path = require('path')
const startDirectory = path.join(__dirname, 'files')
const finishDirectory = path.join(__dirname, 'files-copy')


fs.stat(finishDirectory, function (err) {
    if (!err) {
        (async function () {
            await fs.readdir(finishDirectory, (err, files) => {
                if (!err) {
                    for (let i = 0; i < files.length; i++) {
                        fs.unlink(finishDirectory + "/" + files[i], (err) => {
                            if (err) console.log(err)
                        })
                    }
                    promises.rmdir(finishDirectory)
                    copyFiles()
                }
            })
        })()

    } else if (err.code === 'ENOENT') {
        copyFiles()
    }
})

async function copyFiles() {
  await  promises.mkdir(finishDirectory, {recursive: true});
   await fs.readdir(startDirectory, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            promises.copyFile(path.join(startDirectory, files[i]), path.join(finishDirectory, files[i]));
        }
    })
}

//console.log('iiii',filesInFinish)
//
//
// const fsPromises = require('fs/promises');
// const path = require('path');
// const folderPath = path.join(__dirname, 'files-copy');
// const filesPath = path.join(__dirname, 'files');
//
// async function copyFiles() {
//     fsPromises.mkdir(folderPath, {recursive: true});
//     const files = await fsPromises.readdir(filesPath);
//     for(let i = 0; i < files.length; i++){
//         const srcFile = path.join(filesPath, files[i]);
//         const destFile = path.join(folderPath, files[i]);
//         fsPromises.copyFile(srcFile, destFile);
//     }
// }
// copyFiles();
