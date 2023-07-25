const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})/
const PHONE_REGEX = /^\+380\d{9}$/
const DATE_REGEX = /^(?:0[1-9]|[1-2][0-9]|3[0-1])-(?:0[1-9]|1[0-2])-(?:19[0-9][0-9]|20[0-9][0-9])$/

module.exports = {
    PASSWD_REGEX,
    PHONE_REGEX,
    DATE_REGEX,
}