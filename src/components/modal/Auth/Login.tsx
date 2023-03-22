import { authModalState } from "@/atoms/AuthModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type Props = {};

const Login = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) return;
    signInWithEmailAndPassword(login.email, login.password);
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        required
        name="email"
        type="email"
        placeholder="Email"
        value={login.email}
        onChange={onChangeHandler}
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
      <Input
        required
        name="password"
        type="password"
        placeholder="Password"
        value={login.password}
        onChange={onChangeHandler}
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
      {error && (
        <Text
          textAlign="center"
          fontSize="10pt"
          color="red.500"
          fontWeight={400}
        >
          {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}{" "}
        </Text>
      )}

      <Button
        width="100%"
        my="2"
        height="36px"
        type="submit"
        isLoading={loading}
      >
        {" "}
        Log in
      </Button>
      <Flex  justifyContent="center" pt="3">
        <Text fontSize="9pt" mr="1">
          Forgot password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState(prev => ({ ...prev, view: "resetPassword" }))
          }
        >
          RESET PASSWORD
        </Text>
      </Flex>
      <Flex  justifyContent="center" gap="2" pt="1">
        <Text fontSize="9pt">New here?</Text>
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
    </form>
  );
};

export default Login;
