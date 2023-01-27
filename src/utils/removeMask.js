
export const removeMask = val => {
  return String(val).replace(/\D+/g, '')
}

export const dateToBack = val => {
  return String(val).split('/').reverse().join('-')
}
export const dateToValid = val => {
  return String(val).split(/\D+/g).reverse().join(', ')
}

export const dateToFront = val => {
  return String(val).split('-').reverse().join('/')
}

export const formatCurrencyFront = value => {
  if(!value) return value
  const patrimony = (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return patrimony
}

export const formatCurrency = value => {
  if (!value) return value
  value = String(value)
  const newValue = value.replace(/[R$]/g, '')
  newValue.replace(/[^0-9]/g, "")

  return newValue
}
