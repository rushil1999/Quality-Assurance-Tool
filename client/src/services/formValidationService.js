//SJSU CMPE 138 Spring 2022 TEAM3 

export const checkEmptyFields = (obj) => {
  for (const property in obj) {
    console.log(`${property}: ${obj[property]}`);
    if(obj[property] === undefined || obj[property] === null || obj[property] === ''){
      return false;
    }
  }
  return true;
}