import { authModalState } from "@/atoms/AuthModalAtom";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
type Props = {};

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () =>
    setModalState(prev => ({
      ...prev,
      isOpen: false,
    }));
  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === "login" && "Log in"}
            {modalState.view === "signup" && "Sign up "}
            {modalState.view === "resetPassword" && "Reset password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Here is the modal content</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
