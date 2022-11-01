const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname,'secret-folder')

try {
    const files = fs.readdirSync(directory,{withFileTypes: true})
    for (let file of files) {
        if(file.isFile()) {
            //console.log(file.name)
            fs.stat(directory + '/' + file.name, (err, stats) => {
                console.log(path.parse(file.name).name + ' - '  + path.extname(file.name).replace('.','') + ' - ' + stats.size/1000 + ' kb')
            })
        }
    }
} catch (err) {
    console.error(err)
}
