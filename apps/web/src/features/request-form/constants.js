const getEnvValue = (key, fallback) => import.meta.env[key] || fallback;

export const REQUIRED_FILE_KEYS = {
  AUTHORIZATION: getEnvValue('VITE_REQUIRED_FILE_KEY_AUTHORIZATION', 'AUTHORIZATION_DOCUMENT'),
  CERTIFICATE: getEnvValue('VITE_REQUIRED_FILE_KEY_CERTIFICATE', 'CERTIFICATE'),
  SELFIE: getEnvValue('VITE_REQUIRED_FILE_KEY_SELFIE', 'SELFIE'),
};

export const UPLOAD_REQUIREMENTS = {
  [REQUIRED_FILE_KEYS.SELFIE]: {
    accept: 'image/*',
    buttonText: 'Selecionar selfie com documento',
    inputId: 'file-upload-selfie',
    label: 'Anexe uma selfie com documento de identificação',
  },
  [REQUIRED_FILE_KEYS.AUTHORIZATION]: {
    accept: 'application/pdf',
    buttonText: 'Selecionar documento de autorização',
    inputId: 'file-upload-authorization',
    label: 'Anexe o documento de autorização',
  },
  [REQUIRED_FILE_KEYS.CERTIFICATE]: {
    accept: 'application/pdf',
    buttonText: 'Selecionar certidão ou comprovante',
    inputId: 'file-upload-certificate',
    label: 'Anexe a certidão ou comprovante exigido',
  },
};

export const INFO_MESSAGES = {
  PROTOCOLO: 'Para dar andamento a esta solicitação, informe o protocolo ou processo relacionado.',
  'FORMULARIO COMPLEMENTAR': 'Para esta solicitação, é necessário anexar ou preencher o formulário complementar definido pela organização.',
  'CONTATO SUPORTE': 'Para questões relacionadas a esta solicitação, entre em contato com o canal de suporte definido pela organização.',
};
