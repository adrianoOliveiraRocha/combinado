function UploadImage(image, folder) {
    const path = require('path')
    var imageName = new Date().getTime() + path.extname(image.name)
    image.mv(__dirname + `/../public/${folder}/${imageName}`, (err) => {
        if (err) {
            throw new Error(`Error trying upload image: ${err}`)
        }
    })
    return imageName
}

module.exports = () => {
    return UploadImage
}