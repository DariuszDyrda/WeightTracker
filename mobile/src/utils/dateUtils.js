export const getCurrentDateInISO = () => {
    const dt = new Date(Date.now());
    return dt.toISOString().slice(0, 10);
  }

export const countObjWithSameDate = (array) => {
    //the array has to be sorted first
    array.sort((a, b) => (a.date-b.date));
    
    for(let i = 0; i < array.length-1; ++i) {
        if(array[i].date == array[i+1].date) {
          array[i].count++;
          array.splice(i+1, 1);
          --i;
        }
      }
      return array;
}