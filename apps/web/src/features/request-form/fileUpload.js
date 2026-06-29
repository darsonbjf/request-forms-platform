import { toast } from 'react-toastify';

const validExtensions = ['pdf', 'jpg', 'png'];

const validateFile = (file) => {
  if (!file) {
    return { valid: false, message: "Nenhum arquivo selecionado. Por favor, selecione um arquivo." };
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!validExtensions.includes(fileExtension)) {
    return { valid: false, message: "Tipo de arquivo inválido. Selecione um arquivo .pdf, .jpg ou .png." };
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    return { valid: false, message: "O arquivo deve ter no máximo 5MB." };
  }

  return { valid: true };
};

const handleFileChange = (event, setFile, setFileName, setBorderColor) => {
  const file = event.target.files[0];
  const validation = validateFile(file);

  if (!validation.valid) {
    toast.error(validation.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setBorderColor("red.500");
    event.target.value = null;
    setFileName(""); 
    return;
  }

  setFile(file);
  setFileName(file.name);
  setBorderColor("green.500");
};

export { validateFile, handleFileChange };
