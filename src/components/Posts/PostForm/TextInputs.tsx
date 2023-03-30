import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  createPostHandler: () => void;
  loading: boolean;
};

const TextInputs = ({
  textInputs,
  onChange,
  createPostHandler,
  loading,
}: TextInputProps) => {
  return (
    <Stack spacing="3" width="100%">
      <Input
        placeholder="Title"
        fontSize="10pt"
        borderRadius="4"
        name="title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          borderColor: "black",
          bg: "white",
          border: "1px solid black",
        }}
        value={textInputs.title}
        onChange={onChange}
      />
      <Textarea
        name="body"
        placeholder="What's on your mind?"
        fontSize="10pt"
        borderRadius="4"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          borderColor: "black",
          bg: "white",
          border: "1px solid black",
        }}
        value={textInputs.body}
        onChange={onChange}
      />
      <Flex justify="flex-end">
        <Button
          isDisabled={!textInputs.title}
          isLoading={loading}
          onClick={createPostHandler}
          height="34px"
          padding="0px 30px"
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
