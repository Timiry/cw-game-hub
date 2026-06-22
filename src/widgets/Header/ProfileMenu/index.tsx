"use client";

import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import routes from "@/shared/config/routes";
import { useTranslations } from "next-intl";
import { Typography } from "@cw-game/react-ui";
import Box from "@mui/material/Box";

interface UserMenuProps {
  avatarUrl?: string;
  userName?: string;
  onLogout: () => void;
}

export const UserMenu = ({ avatarUrl, userName, onLogout }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const t = useTranslations("Header");

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      onLogout();
      router.push(routes.login);
    } finally {
      handleClose();
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
        <Avatar
          src={avatarUrl || "/avatar-fallback.svg"}
          alt={userName || t("nameFallback")}
          variant="rounded"
          sx={{
            width: 36,
            height: 36,
            border: "1px solid",
            borderColor: "theme.palette.hub.primary.dark",
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
      >
        <Typography variant="h5" px="16px">
          {userName || t("nameFallback")}
        </Typography>
        <MenuItem
          onClick={() => {
            router.push(routes.myProfile);
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("profile")}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("signOut")}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
