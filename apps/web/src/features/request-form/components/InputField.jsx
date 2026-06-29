import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export function InputField({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  isInvalid,
  isRequired = true,
}) {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {isInvalid && <FormErrorMessage>{label} inválido.</FormErrorMessage>}
    </FormControl>
  );
}
