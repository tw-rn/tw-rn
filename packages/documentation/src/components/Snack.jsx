import React, { useEffect } from "react";

const Snack = ({ snackId, preview = "true", height = "400px" }) => {
  useEffect(() => {
    if (window.ExpoSnack) window.ExpoSnack.initialize();
  }, []);

  return (
    <div
      data-snack-id={snackId}
      data-snack-platform="web"
      data-snack-preview={preview}
      data-snack-theme="dark"
      style={{
        overflow: "hidden",
        background: "#212733",
        border: "1px solid rgba(0,0,0,.08)",
        borderRadius: "4px",
        height,
        width: "100%",
      }}
    />
  );
};

export default Snack;
