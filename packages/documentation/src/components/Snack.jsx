import React, { useEffect } from "react";

const Snack = ({ snackId }) => {
  useEffect(() => {
    if (window.ExpoSnack) window.ExpoSnack.initialize();
  }, []);

  return (
    <div
      data-snack-id={snackId}
      data-snack-platform="web"
      data-snack-preview="true"
      data-snack-theme="dark"
      style={{
        overflow: "hidden",
        background: "#212733",
        border: "1px solid rgba(0,0,0,.08)",
        borderRadius: "4px",
        height: "400px",
        width: "100%",
      }}
    />
  );
};

export default Snack;
