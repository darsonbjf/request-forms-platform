// utils.js
export const formatDate = (date, includeTime = false) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...(includeTime && { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    return date ? new Intl.DateTimeFormat('pt-BR', options).format(date) : 'N/A';
  };

  