"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslations } from "next-intl";
import { StyledDrawer } from "./styles";

interface MenuItem {
  id: string;
  label: string;
}

interface SettingsSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const SettingsSidebar = ({
  activeSection = "appearance",
  onSectionChange,
}: SettingsSidebarProps) => {
  const t = useTranslations("ProfileSettingsPage");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("desktop"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionClick = (section: string) => {
    onSectionChange?.(section);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: "appearance",
      label: t("profileAppearance"),
    },
  ];

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <List>
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleSectionClick(item.id)}
                selected={isActive}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box>
      {isMobile && (
        <Box pl={2}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          width: { desktop: 240 },
        }}
      >
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          disableScrollLock
          sx={{
            display: { mobile: "block", desktop: "none" },
          }}
        >
          {drawerContent}
        </StyledDrawer>

        <StyledDrawer
          variant="permanent"
          open
          sx={{
            display: { mobile: "none", desktop: "block" },
          }}
        >
          {drawerContent}
        </StyledDrawer>
      </Box>
    </Box>
  );
};
