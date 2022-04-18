//--------------------------------------------------------------
//--------------------------------------------------------------
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

//--------------------------------------------------------------
//--------------------------------------------------------------

class QRScanner2 {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  public async startScan(): Promise<void> {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.stopScan();
      alert(result.content);
    }
  }
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  public stopScan(): void {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  public askUser(): void {
    const c = window.confirm("Do you want to scan a barcode?");

    if (c) {
      this.startScan();
    }
  }
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  public async checkPermission(): Promise<Boolean> {
    const statusRequest = await BarcodeScanner.checkPermission({ force: true });

    if (statusRequest.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (statusRequest.granted) {
      // the user did grant the permission now
      return true;
    }

    // user did not grant the permission, so he must have declined the request
    return false;
  }
  //--------------------------------------------------------------
  //--------------------------------------------------------------
}

//--------------------------------------------------------------
//--------------------------------------------------------------

export default QRScanner2;
