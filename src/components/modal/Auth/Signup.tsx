import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/AuthModalAtom";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type Props = {};

const Signup = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) {
      setFormError("");
    }

    if (signup.password !== signup.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(signup.email, signup.password);
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignup(prev => ({
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
        value={signup.email}
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
        value={signup.password}
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
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={signup.confirmPassword}
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
      <Text textAlign="center" fontSize="10pt" color="red.500" fontWeight={400}>
        {formError ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        my="2"
        height="36px"
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex justifyContent="center" gap="2" pt="3">
        <Text fontSize="9pt"> Have an account?</Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState(prev => ({ ...prev, view: "login" }))
          }
        >
          SIGN IN
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
