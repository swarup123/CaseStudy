import React from "react";
import { Button } from "@mui/material";

function MuiButton(props: {
  handleClick: React.MouseEventHandler;
  children: String;
}) {
  const { handleClick, children } = props;
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export default MuiButton;
