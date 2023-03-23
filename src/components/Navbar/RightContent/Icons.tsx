import React from 'react'
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";


const Icons = () => {
  return (
    <Flex>
      <Flex
        display={{ sm: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mx="1.5"
          padding="1"
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize="21px" />
        </Flex>

        <Flex
          mx="1.5"
          padding="1"
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize="24px" />
        </Flex>

        <Flex
          mx="1.5"
          padding="1"
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoVideocamOutline} fontSize="24px" />
        </Flex>
      </Flex>
      <>
        <Flex
          mx="1.5"
          padding="1"
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize="20px" />
        </Flex>

        <Flex
          mx="1.5"
          padding="1"
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize="23px" />
        </Flex>
        <Flex
          display={{ sm: "none", md: "flex" }}
          mx="1.5"
          padding="1"
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={GrAdd} fontSize="20px" />
        </Flex>
      </>
    </Flex>
  );
}

export default Icons