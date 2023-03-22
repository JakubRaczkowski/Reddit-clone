import { authModalState } from "@/atoms/AuthModalAtom";
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import Reset from "./Reset";

type Props = {};

const AuthInputs = (props: Props) => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction="column" align="center" width="100%" mt="4">
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <Signup />}
      {modalState.view === "resetPassword" && <Reset />}
    </Flex>
  );
};

export default AuthInputs;
