import { Network } from "@capacitor/network";

//--------------------------------------------------------------
//--------------------------------------------------------------

class NetworkChecker {
  constructor() {}
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  public static detectNetwork(): void {
    Network.addListener("networkStatusChange", (status) => {
      if (status.connected) alert("The network connected !");
      else alert("Please turn on your network to use the app !");
    });
  }
  //--------------------------------------------------------------
  //--------------------------------------------------------------
}

//--------------------------------------------------------------
//--------------------------------------------------------------

export default NetworkChecker;
