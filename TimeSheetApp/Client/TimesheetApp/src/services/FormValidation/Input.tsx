const handleChange = (e: any, name: string, setMessage: any,formValue:any) => {
  formValue[name] =  e.target.value;
  setMessage("");
};

const handleChangeForDP = (value: any, name: string, setMessage: any,formValue:any) => {
  formValue[name] = value;
  setMessage("");
};

export default {handleChange,handleChangeForDP};
