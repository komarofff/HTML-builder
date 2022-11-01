const fs = require('fs')
const path = require('path')
const output = fs.createWriteStream(path.join(__dirname, 'writeText.txt'))
const {stdin, stdout} = process
stdout.write('Write text (to finish write exit or press CTR+C) : \n')
stdin.on('data', data => {
    let text = data.toString().trim()
    if (text !== 'exit') {
        output.write(data)
    } else if (text === 'exit') {
        process.exit()
    }
})
process.on('exit', () => stdout.write('God luck!\n'))
process.on('SIGINT', () => {
       process.exit()
})