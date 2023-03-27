import { Flex } from "@chakra-ui/react";
import React from "react";
import { PropsWithChildren } from "react";
type ChildrenProps = [React.ReactNode, React.ReactNode];

const PageContent = ({ children }: PropsWithChildren) => {
  return (
    <Flex border="1px solid red" justify="center" padding="16px 0px">
      <Flex
        border="1px solid blue"
        justify="center"
        width="95%"
        maxWidth="860px"
      >
        <Flex
          border="1px solid green"
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        <Flex
          border="1px solid yellow"
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow='1'
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
