/* Using with useIonAlert Hook */

import React from "react";
import { useIonAlert } from "@ionic/react";

interface Props {
  header: any;
  message: any;
  yesText: any;
  noText: any;
  yesFunction: any;
  noFunction: any;
}

const Alert_YESNO: React.FC<Props> = (props: Props) => {
  const [present] = useIonAlert();
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 1,
        width: "100%",
        height: "100%",
      }}
      onClick={() =>
        present({
          cssClass: "my-css",
          header: props.header,
          message: props.message,
          buttons: [
            {
              text: props.noText,
              role: "cancel",
              cssClass: "base-color",
              handler: props.noFunction,
            },
            {
              text: props.yesText,
              role: "ok",
              cssClass: "base-color",
              handler: props.yesFunction,
            },
          ],
        })
      }
    ></div>
  );
};

export default Alert_YESNO;
