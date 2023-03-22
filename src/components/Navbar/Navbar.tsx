import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";



export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);


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
      <RightContent user={user} />
    </Flex>
  );
};
