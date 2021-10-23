function correctMinutes(min) {
    var minutes = min.toString()
    if (minutes.length < 2) {
        minutes = '0' + minutes
    }
    return minutes
}

function calculate(queryTime, init, end) {

    var queryTime = parseInt(queryTime)
    var hInit = parseInt(init.split(':')[0])
    var mInit = parseInt(init.split(':')[1])
    var hEnd = parseInt(end.split(':')[0])
    var mEnd = parseInt(end.split(':')[1])

    var minutes = (hEnd - hInit) * 60
    minutes = minutes - (mInit - 1)
    minutes = minutes + mEnd

    var moment = 0
    var keepMoments = []
    do {
        keepMoments.push(moment)
        moment += queryTime
    } while (moment < minutes)

    var calculatedHours = []
    keepMoments.forEach(el => {
        var init = mInit + el
        var h = hInit + parseInt(init / 60)
        var min = parseInt(init % 60)
        correctMinutes(min)
        var result = `${h}:${correctMinutes(min)}`
        calculatedHours.push(result)
    })
    return calculatedHours
}

module.exports = () => {
    return calculate
}