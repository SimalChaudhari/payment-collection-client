export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' }); // Change locale to 'en-US'
    const year = date.getFullYear();
    
    // Return formatted date
    return `${month} ${day}, ${year}`;
}


 export const formatTime = (dateString) => {
    const date = new Date(dateString);
    
    // Format time
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // 12-hour format
    };
    const time = date.toLocaleTimeString('en-IN', optionsTime);
    
    // Return formatted time
    return time;
  }
  
