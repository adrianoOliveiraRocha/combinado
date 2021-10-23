function DeleteImage(folder, imageName) {
    let completePath = __dirname + `/../public/${folder}/${imageName}`
    const fs = require('fs')
    fs.unlink(completePath, (err, response) => {
        if (err) {
            console.error(`Error trying delete old image of the object ${err}`)
        } else {
            console.log('Image deleted with success!', response)
        }
    })
}

module.exports = () => {
    return DeleteImage
}