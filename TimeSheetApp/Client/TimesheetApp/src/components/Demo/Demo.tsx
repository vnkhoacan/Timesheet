import { useState } from "react";
import "./Demo.css";

const Demo: React.FC = function () {
  const [hidden,setHidden] = useState<boolean>(false);

  function show()
  {
      setHidden(!hidden);
  }

  return (
    <div className="demo">
      ok1
      <div className="ok2">ok2</div>
      <button onClick={show} >Show</button>
      {hidden?<div className="ok2">show</div>:""}
    </div>
  );
};

export default Demo;
