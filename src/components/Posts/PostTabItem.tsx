import { Flex, Icon,Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type TabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelected: (title: string) => void;
};
const PostTabItem = ({ item, selected, setSelected }: TabItemProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow="1"
      p="14px 0"
      cursor="pointer"
      fontWeight='700'
      _hover={{ bg: "gray.100" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelected(item.title)}
    >
      <Flex>
        <Icon
          as={item.icon}
          height="24px"
          align="center"
          color="gray.500"
          mr={4}
        />
      </Flex>
      <Text mr="2" fontSize="10pt">
        {item.title}
      </Text>
    </Flex>
  );
};

export default PostTabItem;
