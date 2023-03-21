import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

export const Navbar = () => {
  return (
    <Flex bg="white" height="44 px " padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="logo"
          height="40px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* <Directory /> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
