import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import {User} from "firebase/auth";

type SearchInputProps = {
  user?: User | null
};

const SearchInput = ({ user }: SearchInputProps) => {
  return (
    <Flex align="center" flexGrow={"1"} maxWidth={user ? "auto" : "600px"} mx="2">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon color="gray.400" />}
        />
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.300",
          }}
          _focus={{
            ourline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.100"
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
