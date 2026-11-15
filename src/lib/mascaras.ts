export function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

export function aplicarMascaraTelefone(valor: string) {
  const digitos = somenteDigitos(valor).slice(0, 11);

  if (digitos.length > 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  }

  if (digitos.length > 6) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }

  if (digitos.length > 2) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  }

  return digitos;
}

export function aplicarMascaraData(valor: string) {
  const digitos = somenteDigitos(valor).slice(0, 8);

  if (digitos.length > 4) {
    return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`;
  }

  if (digitos.length > 2) {
    return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  }

  return digitos;
}
