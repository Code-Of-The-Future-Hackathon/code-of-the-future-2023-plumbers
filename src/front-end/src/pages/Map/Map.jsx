import { memo } from "react";

import GoogleMaps from "./GoogleMaps";

const Map = () => {
  return (
    <div>
      <GoogleMaps />
    </div>
  );
};

export default memo(Map);
