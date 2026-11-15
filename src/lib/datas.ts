export function converterDataParaIso(dataBrasileira: string) {
  const [dia, mes, ano] = dataBrasileira.split("/");

  return `${ano}-${mes}-${dia}`;
}

export function ehDataValida(dataBrasileira: string) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataBrasileira)) {
    return false;
  }

  const [dia, mes, ano] = dataBrasileira.split("/").map(Number);
  const data = new Date(ano, mes - 1, dia);

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia
  );
}

export function calcularIdade(dataBrasileira: string) {
  const [dia, mes, ano] = dataBrasileira.split("/").map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;

  if (
    hoje.getMonth() + 1 < mes ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)
  ) {
    idade -= 1;
  }

  return idade;
}
