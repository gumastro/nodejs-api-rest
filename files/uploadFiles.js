const fs = require('fs')

fs.createReadStream('./assets/wboris.jpeg')
    .pipe(fs.createWriteStream('./assets/wboris-stream.jpeg'))
    .on('finish', () => {
        console.log('Image successfully writen')
    })