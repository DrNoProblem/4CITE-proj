exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (data) => {
    const usersIds = dbuser.map(data => data.id)
    const maxId = usersIds.reduce((a, b) => Math.max(a, b))
    const uniqueId = maxId + 1
    return uniqueId
}