exports.formatDate = dateTime => {
    const date = new Date(dateTime)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()
    let hour = date.getHours() + 7
    let minute = date.getMinutes()
    let second = date.getSeconds()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day
    if (String(hour).length < 2)
        hour = '0' + hour
    if (String(minute).length < 2)
        minute = '0' + minute
    if (String(second).length < 2)
        second = '0' + second

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

exports.handleMessage = (type, text, msgBy, profileId, profileName, lang) => {

    switch (type) {
        case 'TXT':
            return text
        case 'IMG':
            return (msgBy == profileId) ? 'คุณส่งรูป' : profileName + ' ส่งรูป'
        case 'VDO':
            return (msgBy == profileId) ? 'คุณส่งวิดีโอ' : profileName + ' ส่งวิดีโอ'
        case 'AUDIO':
            return (msgBy == profileId) ? 'คุณส่งไฟล์เสียง' : profileName + ' ส่งไฟล์เสียง'
        default:
            return text
    }
}