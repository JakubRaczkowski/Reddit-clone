import React, { useState } from "react";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../modal/CreateCommunity/CreateCommunityModal";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/CommunitiesAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

const Communities = () => {
  const mySnippets = useRecoilValue(communityState).mySnippets;

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <Box mt="3" mb="4">
        <Text pl="3" mb="1" fontSize="7" fontWeight="500" color="gray.500">
          MODERATING
        </Text>

        
        {mySnippets.filter(community=>community.isModerator).map(community => {
          return (
            <MenuListItem
              key={community.communityId}
              displayText={`r/${community.communityId}`}
              link={`/r/${community.communityId}`}
              iconColor="brand.100"
              imageURL={community.imageURL}
              icon={FaReddit}
            />
          );
        })}
      </Box>
      <Box mt="3" mb="4">
        <Text pl="3" mb="1" fontSize="7" fontWeight="500" color="gray.500">
          MY COMMUNITIES
        </Text>

        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex justify="left" align="center">
            <Icon as={GrAdd} fontSize="20px" mr="2" />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map(community => {
          return (
            <MenuListItem
              key={community.communityId}
              displayText={`r/${community.communityId}`}
              link={`/r/${community.communityId}`}
              iconColor="brand.100"
              imageURL={community.imageURL}
              icon={FaReddit}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Communities;
