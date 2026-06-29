import { AttachmentIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export function FileUploadField({
  accept,
  borderColor,
  buttonText,
  fileName,
  inputId,
  isVisible,
  label,
  onChange,
}) {
  if (!isVisible) return null;

  return (
    <FormControl mt={4} isRequired>
      <FormLabel>{label}</FormLabel>
      <Input
        id={inputId}
        type="file"
        accept={accept}
        onChange={onChange}
        opacity="0"
        position="absolute"
        zIndex="-1"
      />
      <Button
        as="label"
        htmlFor={inputId}
        leftIcon={<AttachmentIcon />}
        colorScheme="blue"
        variant="outline"
        size="lg"
        border="5px dashed"
        borderColor={borderColor || 'gray.300'}
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: 'blue.50', borderColor: 'blue.400' }}
        _active={{ bg: 'blue.100' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={6}
        boxShadow="sm"
        whiteSpace="normal"
        width="100%"
      >
        {fileName || buttonText}
      </Button>
    </FormControl>
  );
}
