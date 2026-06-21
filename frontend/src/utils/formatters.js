const formatDate = (dateString) =>{
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
   
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
   
    return formattedDate;
}

const formatCurrency = (amount) =>{
    if (amount === undefined || amount === null || isNaN(amount)) {
        return '$0';
    }
   
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
   
    return formatter.format(amount);
}

export { formatDate, formatCurrency };