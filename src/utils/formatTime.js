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
  
export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export function getDateNDaysEarlier(days) {
    const daysInMilliseconds = days * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    const nDaysAgoTimestamp = Date.now() - daysInMilliseconds;
    const nDaysAgoDate = new Date(nDaysAgoTimestamp);

    const year = nDaysAgoDate.getFullYear();
    const month = String(nDaysAgoDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(nDaysAgoDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}