
function equalObject(objectFirst, objectSecond) {
  const objectFirstKeys = Object.keys(objectFirst);
  const objectSecondKeys = Object.keys(objectSecond);
  if (objectFirstKeys.length !== objectSecondKeys.length) return false;
  for (let key of objectFirstKeys) {
    if (objectFirst[key] !== objectSecond[key]) {
      return false;
    }
  }
  return true;
}


export {equalObject};


