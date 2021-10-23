const correct = (value) => {
    return (value < 10 ? '0' + value : value)
}

const correctMonth = (value) => {
    var realMonth = value + 1
    return (realMonth < 10 ? '0' + realMonth : realMonth)
}

const portuguesedateTime = (datetime) => {
    console.log(typeof datetime)
    var pdt = correct(datetime.getDate()) + '/' +
        correctMonth(datetime.getMonth()) + '/' +
        datetime.getFullYear() + ' ' +
        correct(datetime.getHours()) + ':' +
        correct(datetime.getMinutes())
    return pdt
}

module.exports = () => {
    return portuguesedateTime
}