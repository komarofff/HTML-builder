const fs = require('fs')
const path = require('path')

const template = path.join(__dirname, 'template.html')
const projectFolder = path.join(__dirname, 'project-dist')
const projectIndexFile = path.join(projectFolder, 'index.html')
const projectStyleFile = path.join(projectFolder, 'style.css')
const componentsFolder = path.join(__dirname, 'components')
const assetsFolderSource = path.join(__dirname, 'assets')
const assetsFolderDestination = path.join(projectFolder, 'assets')

;(async function () {
    // create project directory
    await fs.promises.mkdir(projectFolder, {recursive: true})
    //create style.css in destination folder
    await fs.promises.writeFile(projectStyleFile, '')
    //create index.html in destination folder
    await fs.promises.writeFile(projectIndexFile, '')

    const templateData = await fs.promises.readFile(template, 'utf-8')
    let fullData = templateData
    let result = templateData.match(/({{\w+}})/g).map(el => el.replace('{{', '').replace('}}', ''))
    //console.log(result)
    const templateFiles = await fs.promises.readdir(componentsFolder, 'utf-8')
    for (let i = 0; i < result.length; i++) {
        let file = result[i] + '.html'
        templateFiles.forEach(el => {
            if (path.extname(el) === '.html' && el === file) {
                (async function () {
                    await fs.readFile(path.join(componentsFolder, el), 'utf-8', (err, data) => {
                        if (err) throw err
                        //fs.promises.appendFile(projectStyleFile, data)
                        let replace = `{{${result[i]}}}`;
                        let query = new RegExp(replace, "g");
                        fullData = fullData.replace(query, data)
                        fs.promises.writeFile(projectIndexFile, fullData)
                    })
                })()
            }
        })
    }
    // console.log(fullData)
    // // create project directory
    // await fs.promises.mkdir(projectFolder, {recursive: true})
    // //create style.css in destination folder
    // await fs.promises.writeFile(projectStyleFile, '')
    //
    // // read index file - template in var
    // let templateData = await fs.promises.readFile(template, 'utf-8')
    // // get header info
    // const headerData = await fs.promises.readFile(path.join(componentsFolder, 'header.html'), 'utf-8')
    // // get articles info
    // const articlesData = await fs.promises.readFile(path.join(componentsFolder, 'articles.html'), 'utf-8')
    // // get footer info
    // const footerData = await fs.promises.readFile(path.join(componentsFolder, 'footer.html'), 'utf-8')
    // // create fullData with changes
    // let fullData = templateData.replace(/{{header}}/g, headerData).replace(/{{articles}}/g, articlesData).replace(/{{footer}}/g, footerData)
    // // create destination file and push data
    // await fs.promises.writeFile(projectIndexFile, fullData)
    //

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
    const styleFiles = await fs.promises.readdir(path.join(__dirname, 'styles'), 'utf-8')
    styleFiles.forEach(el => {
        if (path.extname(el) === '.css') {
            (async function () {
                await fs.readFile(path.join(path.join(__dirname, 'styles'), el), 'utf-8', (err, data) => {
                    if (err) throw err
                    fs.promises.appendFile(projectStyleFile, data)
                })

            })()
        }
    })


})()