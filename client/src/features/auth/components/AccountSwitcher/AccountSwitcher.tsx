import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../common/hooks";

import MuiMenuList from "@mui/material/MenuList";
import MuiDivider from "@mui/material/Divider";
import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";

import StyledMenu from "../../../../common/components/styled/StyledMenu";
import { useRevokeTokensMutation } from "../../../../api/generated/identity.api";
import { useMessageBar } from "../../../message-bar/hooks";

export default function AccountSwitcher() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { showSuccess } = useMessageBar();
  const [revokeTokens, { isSuccess }] = useRevokeTokensMutation();

  const currentUser = useAppSelector((store) => store.auth.currentUser);

  const handleClickAccountIcon = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Logged out");
    }
  }, [isSuccess]);

  return (
    <>
      <Avatar variant="circular" label={currentUser?.displayName} />
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiMenuList dense disablePadding>
          <MenuItem
            avatarIcon={<Avatar label={currentUser?.displayName} />}
            label={currentUser?.displayName}
          />
          <MuiDivider />
          <MenuItem
            avatarIcon={<MuiLockTwoToneIcon />}
            label="Logout"
            onClick={async () => {
              await revokeTokens();
              handleClose();
            }}
          />
        </MuiMenuList>
      </StyledMenu>
    </>
  );
}
