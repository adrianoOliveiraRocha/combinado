const currectThis = (value) => {
    return value < 10 ? `0${value}` : value
}

const createSQLDate = (jsDate) => {
    let year = jsDate.getFullYear()
    let month = jsDate.getMonth() + 1
    let day = jsDate.getDate()
    return `${year}-${currectThis(month)}-${currectThis(day)}`
}

module.exports = () => {
    return createSQLDate
}