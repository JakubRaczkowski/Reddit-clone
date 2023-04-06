import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";

import { auth } from "@/firebase/clientApp";
import { signOut } from "firebase/auth";
import { User } from "firebase/auth";

import { useSetRecoilState, useResetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/AuthModalAtom";
import { communityState } from "../../../atoms/CommunitiesAtom";

type UserMenu = {
  user?: User | null;
};

const UserMenu = ({ user }: UserMenu) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize="27"
                  as={FaRedditSquare}
                  color="gray.300"
                  transform="auto"
                  translateY="-1px"
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  align="flex-start"
                  mr="8"
                  fontSize="8pt"
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr="1" />
                    <Text color="gray.400"> 1 Karma </Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>

      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex>
                <Icon as={CgProfile} fontSize="20px" mr="2" />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex>
                <Icon as={MdOutlineLogin} fontSize="20px" mr="2" />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModalState({ view: "login", isOpen: true })}
            >
              <Flex>
                <Icon as={MdOutlineLogin} fontSize="20px" mr="2" />
                Log in / Sign up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
