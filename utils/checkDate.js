exports.checkDate = (candidate) => {
    const today = new Date()
    const check = new Date(candidate)

    if(today <= check) return false

    return true
}