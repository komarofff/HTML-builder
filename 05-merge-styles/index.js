const fs = require('fs')
const path = require('path')
const styles = path.join(__dirname, 'styles')
const distFolder = path.join(__dirname, 'project-dist')
const distFile = path.join(distFolder, 'bundle.css');
(async function () {
    await fs.readdir(styles, (err, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].includes('css')) {
                fs.readFile(styles + '/' + files[i], 'utf-8', (err, style) => {
                    fs.appendFile(distFile, style, () => {
                    })
                })
            }
        }
    })
})()