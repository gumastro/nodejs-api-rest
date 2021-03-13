const fs = require('fs')
const path = require('path')

module.exports = (imagePath, fileName, callbackImageCreated) => {

    const validFormats = ['jpg', 'png', 'jpeg']
    const format = path.extname(imagePath)
    const isFormatValid = validFormats.indexOf(format.substring(1)) !== -1

    if(!isFormatValid) {
        const error = "[ERROR] Invalid image format"
        console.log('[ERROR] Invalid image format')
        callbackImageCreated(error)
    } else {
        const newImagePath = `./assets/images/${fileName}${format}`
        fs.createReadStream(imagePath)
            .pipe(fs.createWriteStream(newImagePath))
            .on('finish', () => {
                callbackImageCreated(false, newImagePath)
            })
    }
}