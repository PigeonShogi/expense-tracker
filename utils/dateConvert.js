const dateConvert = object => {
  const date = object.date.slice(0, 10)
  const dateFinal = date.split('-').join('/')
  return dateFinal
}

module.exports = dateConvert