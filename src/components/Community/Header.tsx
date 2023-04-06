import { Community } from "@/atoms/CommunitiesAtom";
import React from "react";
import { Flex, Box, Image, Icon, Text, Button } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

import useCommunityData from "@/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header = ({ communityData }: HeaderProps) => {
  const { communityStateValue, onJoinOrLeaveCommunity,isLoading } = useCommunityData();

  const isJoined = !!communityStateValue.mySnippets.find(item => {
    console.log(
      item.communityId,
      communityData.id,
      "item. id  + communityData.id"
    );

    return item.communityId === communityData.id;
  });
  console.log(isJoined);
  return (
    <Flex direction="column" width="100%" height="150px">
      <Box height="50%" bg="blue.400" />
      <Flex bg="white" flexGrow={1} justify="center">
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity.imageURL}
              alt="community logo"
              borderRadius='full'
              position='relative'
              color='blue.500'
              top='-3'
              boxSize='66'
              border='4px solid white'
            />
          ) : (
            <>
              <Icon
                as={FaReddit}
                boxSize={14}
                fontSize="64"
                position="relative"
                top="-4"
                color="brand.100"
                borderRadius="50%"
                background="white"
                border="4px solid white"
              />
            </>
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr="6">
              <Text fontWeight="800" fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight="600" color="gray.400" fontSize="10pt">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              height="40px"
              px="6"
              variant={isJoined ? "outline" : "solid"}
              isLoading={isLoading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
