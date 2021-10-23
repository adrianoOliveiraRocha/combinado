const currectThis = (value) => {
    return value < 10 ? `0${value}` : value
}

const getSchedulingHours = (schedulings) => {
    var hours = []
    schedulings.forEach(scheduling => {
        hours.push(
            currectThis(scheduling._datetime.getHours()) +
            ':' + currectThis(scheduling._datetime.getMinutes()) + ':00')
    })
    return hours
}

module.exports = () => {
    return getSchedulingHours
}