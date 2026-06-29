export const cpfMask = (value) => {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)       
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
};

export const isValidCpf = (cpf) => {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; 

  let sum;
  let remainder;
  sum = 0;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export const isValidEmail = (email) => {
  const emailUpper = email.toUpperCase();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;

  return emailRegex.test(emailUpper);
};

export const isValidEmailFuncional = (email) => {
  const upperCaseEmail = email.toUpperCase();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
  return emailRegex.test(upperCaseEmail);
};


export const isValidName = (e, setNomeCompleto) => {
const newValue = e.target.value.toUpperCase();
const sanitizedValue = newValue.replace(/\s+/g, ' ');
const regex = /^[A-ZÀ-ÖØ-Ý\s]*$/;

if (regex.test(sanitizedValue)) {
    setNomeCompleto(sanitizedValue);
}
};

export const isValidMatricula = (value) => {
  const regex = /^[0-9X]{1,8}$/;
  return regex.test(value); 
};

export const isValidContato = (e, setContato) => {
const newValue = e.target.value.replace(/\D/g, '');
let formattedValue = '';

if (newValue.length <= 10) {
    formattedValue = newValue.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
} else {
    formattedValue = newValue.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
}

setContato(formattedValue);
};

export const isValidObservacao = (e, setObs) => {
const newValue = e.target.value.toUpperCase();

if (newValue.length <= 100) {
    setObs(newValue);
}
};
