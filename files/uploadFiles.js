const fs = require('fs')

fs.readFile('./assets/wboris.jpeg', (error, buffer) => {
    console.log('Image has been buffered')

    fs.writeFile('./assets/wboris2.jpeg', buffer, (error) => {
        console.log('Image has been writen')
    })
})