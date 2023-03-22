import { authModalState } from "@/atoms/AuthModalAtom";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { auth } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Reset from "./Reset";

import {BsDot, BsReddit} from 'react-icons/bs'

type Props = {};

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, error] = useAuthState(auth);
  const handleClose = () =>
    setModalState(prev => ({
      ...prev,
      isOpen: false,
    }));

  useEffect(() => {
    if (user) handleClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === "login" && "Log in"}
            {modalState.view === "signup" && "Sign up "}
            {modalState.view === "resetPassword" && "Reset password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pb="10"
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              w="70%"
              border="1px solid red"
            >
              {modalState.view !== "resetPassword" && <OAuthButtons />}
              <AuthInputs />
              <Reset />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
