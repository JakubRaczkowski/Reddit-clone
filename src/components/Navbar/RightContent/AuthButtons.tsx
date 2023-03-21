import { authModalState } from "@/atoms/AuthModalAtom";
import { Button, Flex } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

const AuthButtons = () => {

  const setAuthModalState = useSetRecoilState(authModalState)
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ isOpen: true, view: "login" })}
      >
        Log in
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ isOpen: true, view: "signup" })}
      >
        Sign up
      </Button>
    </>
  );
};

export default AuthButtons;
