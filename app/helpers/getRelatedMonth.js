module.exports = (() => {
    let today = new Date()
    const correct = (month) => {
        if (month < 10) {
            return `0${month}`
        } else {
            return month
        }
    }
    let relatedMonth = `${today.getFullYear()}-${correct(today.getMonth())}`
    return relatedMonth
})()