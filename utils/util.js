const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

const getFirstDayOfMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = 1

  return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatMoney = n => {
  n = n + ''
  const index = n.indexOf('.')
  if (index === -1) {
    return `${n}.00`
  } else if (index === n.length - 2) {
    return `${n}0`
  } else {
    return n
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getFirstDayOfMonth: getFirstDayOfMonth,
  formatMoney: formatMoney
}
