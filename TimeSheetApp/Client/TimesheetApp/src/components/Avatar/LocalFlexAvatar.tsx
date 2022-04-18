import * as React from "react";
import AvatarMui from "@mui/material/Avatar";
import HOST_NAME from "../../models/HostName/HostName";
interface Props {
  src: string;
  name: string;
  style: any;
}

const Avatar: React.FC<Props> = (props: Props) => {
  // change color by string
  function stringToColor(string: any) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  // change avatar by name
  function stringAvatar(name: any) {
    if (name !== undefined) {
      if (name.indexOf(" ") >= 0) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
      }
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name[name.length - 1]}`,
      };
    }
    return "";
  }

  return <AvatarMui style={props.style} src={props.src} {...stringAvatar(props.name)} />;
};

export default Avatar;
