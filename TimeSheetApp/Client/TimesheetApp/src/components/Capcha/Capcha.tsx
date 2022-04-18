//--------------------------------------------------------------
//--------------------------------------------------------------
const createCaptcha = (idName: string): void => {
  const chars: string =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //clear the contents of captcha div first
  var capcha: any = document.getElementById(idName);
  capcha.innerHTML = "";
  var lengthOtp = 6;
  var captcha = [];
  var val = "";
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * chars.length + 1); //get the next character from the array
    if (captcha.indexOf(chars[index]) == -1) {
      captcha.push(chars[index]);
      val += chars[index];
    } else i--;
  }
  capcha.setAttribute("data-text", val);
  var canv = document.createElement("canvas");
  canv.id = "capcha";
  canv.width = 100;
  canv.height = 40;
  var ctx: any = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  capcha.appendChild(canv); // adds the canvas to the body element
};
//--------------------------------------------------------------
//--------------------------------------------------------------
interface Props {
  idName: string;
}
//--------------------------------------------------------------
//--------------------------------------------------------------
const CapchaImage: React.FC<Props> = (props: Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // const chars: string =
  //   "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      id={props.idName}
    ></div>
  );
  //--------------------------------------------------------------
  //--------------------------------------------------------------
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default { createCaptcha, CapchaImage };
