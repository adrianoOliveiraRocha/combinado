const validDateTime = (currentDate) => {
    const today = new Date()
    let response = currentDate >= today
    if (!response) {
        if (currentDate.getDate() == today.getDate() &&
            currentDate.getMonth() == today.getMonth() &&
            currentDate.getFullYear() == today.getFullYear()) {
            response = true
        }
    }
    return response
}

module.exports = () => {
    return validDateTime
}