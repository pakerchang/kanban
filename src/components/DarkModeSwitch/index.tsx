import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

function DarkModeIconSwitch({
  ...rest
}: React.ComponentPropsWithoutRef<typeof IconButton>) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      onClick={toggleColorMode}
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      aria-label="dark-mode-toggle"
      {...rest}
    />
  );
}

export default DarkModeIconSwitch;
