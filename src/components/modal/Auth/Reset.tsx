import { authModalState } from "@/atoms/AuthModalAtom";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { auth } from "@/firebase/clientApp";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot, BsReddit } from "react-icons/bs";

type Props = {};

const Reset = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [sucess, setSucess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPasswordResetEmail(email);
    setSucess(true);
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon
        as={BsReddit}
        justifyContent="center"
        color="brand.100"
        fontSize={40}
        mb={2}
      />
      <Text fontWeight={700} mb="2">
        Reset your password
      </Text>

      {sucess ? (
        <Text mb={4}> Password has been reset</Text>
      ) : (
        <form onSubmit={handleSubmit}>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter your email. We will send you a reset link
          </Text>
          <Input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fontSize="10pt"
            _placeholder={{
              color: "gray.500",
            }}
            _hover={{
              bg: "white",
              border: "1px solid ",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid ",
              borderColor: "blue.500",
            }}
            bg="gray.50"
            mb="2"
          />
          <Button
            type="submit"
            isLoading={sending}
            width="100%"
            height="36px"
            mb={2}
            mt={2}
          >
            Reset Password
          </Button>
        </form>
      )}
      <Flex justifyContent="center" pt="3" gap="1">
        <Text fontSize="9pt" mr="1"></Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState(prev => ({ ...prev, view: "login" }))
          }
        >
          LOG IN
        </Text>
        <Icon as={BsDot} color="gray.500" />
        <Text
          fontSize="9pt"
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState(prev => ({ ...prev, view: "signup" }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};

export default Reset;
