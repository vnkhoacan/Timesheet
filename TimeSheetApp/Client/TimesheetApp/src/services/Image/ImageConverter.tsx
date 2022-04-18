

const stringToArray = (oldValue: any,fieldName:string) => {
  var newValue = [...oldValue];
  newValue.map((value) => {
    if (value[fieldName]) {
      var a: any = [];
      var b = "";
      for (var i = 0; i < value[fieldName].length; i++) {
        b += value[fieldName][i] == "," ? "" : value[fieldName][i];
        if (value[fieldName][i + 1] == "," || i == value[fieldName].length - 1) {
          console.log(b);
          a.push(b);
          b = "";
        }
      }
      value[fieldName] = a;
    }
    else value[fieldName] = [];
  });
  return newValue;
  
};

export default { stringToArray };
