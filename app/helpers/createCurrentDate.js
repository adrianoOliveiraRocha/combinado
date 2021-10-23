const createCurrentDate = (_date, _time) => {
    console.log(_date, _time)
    var { DateTime } = require('luxon')

    let year = parseInt(_date.split('-')[0])
    let month = parseInt(_date.split('-')[1])
    let day = parseInt(_date.split('-')[2])

    let hour = parseInt(_time.split(':')[0])
    let minute = parseInt(_time.split(':')[1])

    const currentDate = DateTime.fromObject({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute
    })

    return currentDate

}

module.exports = () => {
    return createCurrentDate
}