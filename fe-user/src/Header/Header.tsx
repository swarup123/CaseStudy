import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import { AppLogo } from "./partials/AppLogo";
import { AppLink } from "./partials/AppLink";

const navItems = [
  { text: "Create User", href: "/" },
  { text: "List Users", href: "/list-user" },
];

export default function DrawerAppBar() {
  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <AppLogo variant="h6">CREATE USER APPLICATION</AppLogo>
          <Box>
            {navItems.map((item) => (
              <AppLink key={item.text} href={item.href}>
                {item.text}
              </AppLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
