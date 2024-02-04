export function convertTimestamp(timestamp) {
    const dateObject = new Date(timestamp);
    
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    return `${formattedTime} ${formattedDate}`;
  }
  