import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Menu,Button,
    MenuButton, MenuItem, MenuList
} from "@chakra-ui/react";
import { User } from "firebase/auth";

type UserMenu = {
    user?: User | null;
}

const UserMenu = ({user}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu