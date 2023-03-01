
export const removeMask = val => {
  return String(val).replace(/\D+/g, '')
}

export const removeMaskCpf = val => {
  if (val.search('@') !== -1) {
    return val;
  } else {
    let valueCpf = String(val).replace(/\D+/g, '')
    console.log('valueCpf', valueCpf);

    if (/^\d+$/.test(valueCpf)) {
      return valueCpf;
    } else {
      return val;
    }
  }
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
  if (!value) return value
  const patrimony = (value * 1).toLocaleString("pt-BR", {
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

export const cpfToFront = value => {
  const taxId = value.replace(/[^\d]/g, "");

  return taxId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}