const getWhatsappLink = (number, message) => {
    return `https://api.whatsapp.com/send?phone=${number}&text=%20${message}`
}

module.exports = () => {
    return getWhatsappLink
}