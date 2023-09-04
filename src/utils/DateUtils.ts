export function formatDate(dateObj: Date) {
    const date = new Date(dateObj);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

export function validateDate(dateInput: string) {

  const dateTimeParts = dateInput.split(' ');

  if (dateTimeParts.length !== 2) {
    return false;
  }

  const [date, time] = dateTimeParts;
  const [day, month, year] = date.split('.');
  const [hours, minutes] = time.split(':');
  const parsedDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}`);

  // Check if the parsed date is valid and in the future
  // return !isNaN(parsedDate) && 
  //   parsedDate.getDate() === parseInt(day, 10) && 
  //   parsedDate > new Date();

  if (!isNaN(parsedDate.getTime()) && parsedDate > new Date()) {
    return parsedDate;
  }
  
  return null;

}