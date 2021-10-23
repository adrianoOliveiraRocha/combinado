const currectThis = (value) => {
    let intValue = parseInt(value)
    return intValue < 10 ? `0${value}` : intValue
}

const isItBusyTime = (_time, schedulingHours) => {
    var hour = currectThis(_time.split(':')[0])
    var minute = _time.split(':')[1]
    var testTime = hour + ':' + minute + ':00'
    return schedulingHours.includes(testTime)
}

module.exports = () => {
    return isItBusyTime
}