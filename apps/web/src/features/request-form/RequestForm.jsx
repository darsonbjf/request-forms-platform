import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import {
  FormControl, FormLabel, Button, Box, Heading, Grid, Flex,
  Alert, AlertIcon, AlertDescription,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, useDisclosure
} from '@chakra-ui/react';
import {
  cpfMask,
  isValidCpf,
  isValidEmail,
  isValidName,
  isValidMatricula,
  isValidContato,
  isValidObservacao,
  isValidEmailFuncional
} from './validation';
import {
  getCargos,
  getUnidades,
  getServicos,
  getSistemas,
  verificarArquivoNecessario,
  enviarFormulario
} from './api';

import { handleFileChange } from './fileUpload';
import { FileUploadField } from './components/FileUploadField';
import { InputField } from './components/InputField';
import { INFO_MESSAGES, REQUIRED_FILE_KEYS, UPLOAD_REQUIREMENTS } from './constants';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
const captchaEnabled = Boolean(RECAPTCHA_SITE_KEY);

function toSelectOptions(inputArray, labelKey) {
  return inputArray.map(item => ({
    value: item.id,
    label: item[labelKey]
  }));
}

const RequestForm = () => {
  const [selectedCargos, setSelectedCargos] = useState(null);
  const [optionsCargos, setCargos] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState(null);
  const [optionsUnidades, setUnidades] = useState([]);
  const [selectedServicos, setSelectedServicos] = useState(null);
  const [optionsServicos, setServicos] = useState([]);
  const [selectedSistemas, setSelectedSistemas] = useState(null);
  const [optionsSistemas, setSistemas] = useState([]);
  const [cpf, setCpf] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailPessoal, setEmailPessoal] = useState('');
  const [emailFuncional, setEmailFuncional] = useState('');
  const [matricula, setMatricula] = useState('');
  const [contato, setContato] = useState('');
  const [obs, setObs] = useState('');
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [fileName3, setFileName3] = useState("");
  const [borderColor1, setBorderColor1] = useState("");
  const [borderColor2, setBorderColor2] = useState("");
  const [borderColor3, setBorderColor3] = useState("");
  const [captchaValido, setCaptchaValido] = useState(!captchaEnabled);
  const [precisaArquivo, setPrecisaArquivo] = useState([]);
  const [mensagensInformativas, setMensagensInformativas] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEmailFuncionalRequired = !(selectedServicos?.value === 1 && selectedSistemas?.value === 8);
  const [touchedFields, setTouchedFields] = useState({
    nomeCompleto: false,
    cpf: false,
    emailPessoal: false,
    emailFuncional: false,
    matricula: false,
    contato: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cargos, unidades, servicos, sistemas] = await Promise.all([
          getCargos(),
          getUnidades(),
          getServicos(),
          getSistemas(),
        ]);
        setCargos(toSelectOptions(cargos.data, "cargo"));
        setUnidades(toSelectOptions(unidades.data, "unidade"));
        setServicos(toSelectOptions(servicos.data, "servico"));
        setSistemas(toSelectOptions(sistemas.data, "sistema"));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const loadRequiredFiles = async () => {
    if (selectedServicos && selectedSistemas && selectedCargos) {
      try {
        const response = await verificarArquivoNecessario(selectedServicos, selectedSistemas, selectedCargos);

        const arquivosNecessarios = response.data.arquivos || [];
        const arquivosUpload = arquivosNecessarios.filter(arquivo => Object.values(REQUIRED_FILE_KEYS).includes(arquivo));
        const mensagens = arquivosNecessarios.filter(arquivo => ["PROTOCOLO", "FORMULARIO COMPLEMENTAR", "CONTATO SUPORTE"].includes(arquivo));

        setPrecisaArquivo(arquivosUpload);
        setMensagensInformativas(mensagens);
        setIsSubmitEnabled(arquivosUpload.length > 0 && mensagens.length === 0);
      } catch (error) {
        console.error("Erro ao verificar necessidade de arquivo:", error);
        toast.error('Erro ao verificar necessidade de arquivo.');
      }
    }
  };

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaValido(true);
    } else {
      setCaptchaValido(false);
      toast.error('Por favor, complete o reCAPTCHA.');
    }
  };

  useEffect(() => {
    loadRequiredFiles();
  }, [selectedServicos, selectedSistemas, selectedCargos]);

  useEffect(() => {
    const checkFormCompletion = () => {
      const allFieldsFilled =
        cpf &&
        nomeCompleto &&
        dataNascimento &&
        emailPessoal &&
        (isEmailFuncionalRequired ? emailFuncional : true) &&
        matricula &&
        contato &&
        selectedServicos &&
        selectedSistemas &&
        selectedCargos &&
        selectedUnidade &&
        captchaValido &&
        (!precisaArquivo.includes(REQUIRED_FILE_KEYS.SELFIE) || file1) &&
        (!precisaArquivo.includes(REQUIRED_FILE_KEYS.AUTHORIZATION) || file2) &&
        (!precisaArquivo.includes(REQUIRED_FILE_KEYS.CERTIFICATE) || file3) &&
        mensagensInformativas.length === 0;

      setIsSubmitEnabled(allFieldsFilled);
    };

    checkFormCompletion();
  }, [
    cpf, nomeCompleto, dataNascimento, emailPessoal, emailFuncional, matricula, contato,
    selectedServicos, selectedSistemas, selectedCargos, selectedUnidade,
    file1, file2, file3, precisaArquivo, mensagensInformativas, captchaValido
  ]);

  const handleBlur = (field, value) => {
    if (value.trim() !== '') {
      setTouchedFields(prevState => ({ ...prevState, [field]: true }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidCpf(cpf)) {
      toast.error('CPF inválido!');
      return;
    }

    if (!isValidEmail(emailPessoal)) {
      toast.error('E-mail pessoal inválido!');
      return;
    }

    if (isEmailFuncionalRequired && !isValidEmailFuncional(emailFuncional)) {
      toast.error('E-mail Funcional inválido!');
      return;
    }

    if (!isValidMatricula(matricula)) {
      toast.error('Matrícula inválida!');
      return;
    }

    if (captchaEnabled && !captchaValido) {
      alert("Por favor, complete o reCAPTCHA.");
      return;
    }

    const formData = new FormData();
    formData.append('servicoId', selectedServicos.value);
    formData.append('sistemaId', selectedSistemas.value);
    formData.append('unidadeId', selectedUnidade ? selectedUnidade.value : null);
    formData.append('cargoId', selectedCargos ? selectedCargos.value : null);
    formData.append('cpf', cpf);
    formData.append('nomeCompleto', nomeCompleto);
    formData.append('dataNascimento', dataNascimento);
    formData.append('emailPessoal', emailPessoal);
    formData.append('emailFuncional', emailFuncional);
    formData.append('matricula', matricula);
    formData.append('contato', contato);
    formData.append('observacao', obs);
    if (file1) formData.append('file1', file1);
    if (file2) formData.append('file2', file2);
    if (file3) formData.append('file3', file3);

    try {
      setIsFormSubmitted(true);
      await enviarFormulario(formData);
      toast.success('Formulário enviado com sucesso!');
      onOpen();
    } catch (error) {
      toast.error('Erro ao enviar o formulário. Tente novamente.');
      setIsFormSubmitted(false);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box p={8} bg="white" borderRadius="lg" boxShadow="xl" width={{ base: '90%', md: '70%', lg: '65%' }} maxWidth="750px" border="1px solid" borderColor="gray.200">
        <ToastContainer />
        <Heading as="h2" size="lg" mb={4} textAlign="center" bg="blue.400" color="white" p={5} borderRadius="md" fontWeight="bold" boxShadow="lg">
          SOLICITAÇÕES DE SERVIÇOS
        </Heading>
        <Alert status="info" mt={3} >
          <AlertIcon />
          <AlertDescription >Preencha todos os campos obrigatórios para enviar.</AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <Grid templateColumns="1fr 1fr" gap={5} mt={3}>
            <FormControl isRequired>
              <FormLabel>Cargo</FormLabel>
              <Select id="cargo" value={selectedCargos} onChange={(option) => setSelectedCargos(option)} options={optionsCargos} placeholder="Selecione o Cargo" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Unidade</FormLabel>
              <Select id="unidade" value={selectedUnidade} onChange={(option) => setSelectedUnidade(option)} options={optionsUnidades} placeholder="Selecione a Unidade" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Serviço</FormLabel>
              <Select id="servico" value={selectedServicos} onChange={(option) => setSelectedServicos(option)} options={optionsServicos} placeholder="Selecione o Serviço" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Sistema</FormLabel>
              <Select id="sistema" value={selectedSistemas} onChange={(option) => setSelectedSistemas(option)} options={optionsSistemas} placeholder="Selecione o Sistema" />
            </FormControl>
            <InputField id="nomeCompleto" label="Nome Completo" value={nomeCompleto} onChange={(e) => isValidName(e, setNomeCompleto)} onBlur={() => handleBlur('nomeCompleto', nomeCompleto)} isInvalid={!nomeCompleto && touchedFields.nomeCompleto} placeholder="Nome Completo" />
            <InputField id="cpf" label="CPF" value={cpf} onChange={(e) => setCpf(cpfMask(e.target.value))} onBlur={() => handleBlur('cpf', cpf)} isInvalid={touchedFields.cpf && !isValidCpf(cpf)} placeholder="000.000.000-00" />
            <InputField id="dataNascimento" label="Data de Nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} type="date" />
            <InputField id="emailPessoal" label="E-mail Pessoal" value={emailPessoal} onChange={(e) => setEmailPessoal(e.target.value.toUpperCase())} onBlur={() => handleBlur('emailPessoal', emailPessoal)} isInvalid={touchedFields.emailPessoal && !isValidEmail(emailPessoal)} placeholder="E-mail Pessoal" />
            <InputField id="emailFuncional" label="E-mail Funcional" value={emailFuncional} onChange={(e) => setEmailFuncional(e.target.value.toUpperCase())} onBlur={() => handleBlur('emailFuncional', emailFuncional)} isInvalid={touchedFields.emailFuncional && !isValidEmailFuncional(emailFuncional)} placeholder="E-mail Funcional" isRequired={isEmailFuncionalRequired} />
            < InputField id="matricula" label="Matrícula" value={matricula} onChange={(e) => { const newValue = e.target.value; if (isValidMatricula(newValue)) { setMatricula(newValue); } }} onBlur={() => handleBlur('matricula', matricula)} isInvalid={touchedFields.matricula && (matricula.length === 0 || !isValidMatricula(matricula))} placeholder="Matrícula" />
            <InputField id="contato" label="Contato" value={contato} onChange={(e) => isValidContato(e, setContato)} onBlur={() => handleBlur('contato', contato)} isInvalid={touchedFields.contato && !contato} placeholder="(00) 00000-0000" />
            <InputField id="observacao" label="Observação" value={obs} onChange={(e) => isValidObservacao(e, setObs)} isRequired={false} placeholder="Observação" />
          </Grid>

          <FileUploadField
            {...UPLOAD_REQUIREMENTS[REQUIRED_FILE_KEYS.SELFIE]}
            borderColor={borderColor1}
            fileName={fileName1}
            isVisible={precisaArquivo.includes(REQUIRED_FILE_KEYS.SELFIE)}
            onChange={(event) => handleFileChange(event, setFile1, setFileName1, setBorderColor1)}
          />

          <FileUploadField
            {...UPLOAD_REQUIREMENTS[REQUIRED_FILE_KEYS.AUTHORIZATION]}
            borderColor={borderColor2}
            fileName={fileName2}
            isVisible={precisaArquivo.includes(REQUIRED_FILE_KEYS.AUTHORIZATION)}
            onChange={(event) => handleFileChange(event, setFile2, setFileName2, setBorderColor2)}
          />

          <FileUploadField
            {...UPLOAD_REQUIREMENTS[REQUIRED_FILE_KEYS.CERTIFICATE]}
            borderColor={borderColor3}
            fileName={fileName3}
            isVisible={precisaArquivo.includes(REQUIRED_FILE_KEYS.CERTIFICATE)}
            onChange={(event) => handleFileChange(event, setFile3, setFileName3, setBorderColor3)}
          />

          {mensagensInformativas.map((msg, index) => (
            <Alert key={index} status="info" variant="subtle" mt={4} borderRadius="md" boxShadow="md">
              <AlertIcon />
              <AlertDescription color="blue.800">{INFO_MESSAGES[msg]}</AlertDescription>
            </Alert>

          ))}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>SOLICITAÇÃO REALIZADA COM SUCESSO</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Solicitação recebida. Acompanhe pelo canal de atendimento configurado.</ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>Fechar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Box mt={16} display="flex" justifyContent="center" alignItems="center">
            {captchaEnabled ? (
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange} />
            ) : (
              <Alert status="warning" borderRadius="md">
                <AlertIcon />
                <AlertDescription>reCAPTCHA não configurado neste ambiente.</AlertDescription>
              </Alert>
            )}
          </Box>

          <Button type="submit" colorScheme="blue" mt={4} isDisabled={!isSubmitEnabled || isFormSubmitted} width="100%">
            Enviar
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default RequestForm;
