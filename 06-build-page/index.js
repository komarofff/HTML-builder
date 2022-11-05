const fs = require('fs')
const path = require('path')

const template = path.join(__dirname, 'template.html')
const projectFolder = path.join(__dirname, 'project-dist')
const projectIndexFile = path.join(projectFolder, 'index.html')
const projectStyleFile = path.join(projectFolder, 'style.css')
const componentsFolder = path.join(__dirname, 'components')
const assetsFolderSource = path.join(__dirname, 'assets')
const assetsFolderDestination = path.join(projectFolder, 'assets');

(async function () {
    // create project directory
    await fs.promises.mkdir(projectFolder, {recursive: true})
    //create style.css in destination folder
    await fs.promises.writeFile(projectStyleFile, '')
    //create index.html in destination folder
    await fs.promises.writeFile(projectIndexFile, '')

    const templateData = await fs.promises.readFile(template, 'utf-8') // read template file
    let fullData = templateData
    let result = templateData.match(/({{\w+}})/g).map(el => el.replace('{{', '').replace('}}', '')) // get names of including templates in file
    const templateFiles = await fs.promises.readdir(componentsFolder, 'utf-8') // read template directory
    result.forEach((element, idx, result) => {
        let file = element + '.html'
        templateFiles.forEach(el => {
            if (path.extname(el) === '.html' && el === file) { // if we have a file and file is html and our template name equal of file name
                (async function () {
                    let data = await fs.promises.readFile(path.join(componentsFolder, el), 'utf-8') // read template file
                    let replace = `{{${element}}}` // make replace query
                    let query = new RegExp(replace, "g")
                    fullData = fullData.replace(query, data) // replace template
                    return fullData
                })().then(response => {
                    if (idx === result.length - 1) { // when we finish search and replace
                        fs.promises.writeFile(projectIndexFile, response) // rewrite destination file and save full result
                    }
                })
            }
        })
    })


    // copy assets folder
    // create assets folder in project folder and copy all files to destination folder
    await fs.promises.mkdir(assetsFolderDestination, {recursive: true})
    const assetSourceData = await fs.promises.readdir(assetsFolderSource)
    assetSourceData.forEach(el => {
        fs.promises.mkdir(path.join(assetsFolderDestination, el), {recursive: true})
        fs.readdir(path.join(assetsFolderSource, el), 'utf-8', (err, data) => {
            data.forEach(elem => {
                fs.promises.copyFile(path.join(path.join(assetsFolderSource, el), elem), path.join(path.join(assetsFolderDestination, el), elem)) // копируем файлы
            })
        })
    })

    // styles
    // read style folder and if file is css read file and put data to destination style.css file
    const styleFiles = await fs.promises.readdir(path.join(__dirname, 'styles'), 'utf-8')
    styleFiles.forEach(el => {
        if (path.extname(el) === '.css') {
            (async function () {
                await fs.readFile(path.join(path.join(__dirname, 'styles'), el), 'utf-8', (err, data) => {
                    if (err) throw err
                    fs.promises.appendFile(projectStyleFile, "\n" + data)
                })

            })()
        }
    })


})()