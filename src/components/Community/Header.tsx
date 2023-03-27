import { Community } from '@/atoms/CommunitiesAtom'
import React from 'react'
import { Flex,Box,Image, Icon,Text,Button } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'

import useCommunityData from '@/hooks/useCommunityData'

type HeaderProps = {
    communityData: Community
} 

const Header = ({communityData}:HeaderProps) => {

  const { communityStateValue,onJoinOrLeaveCommunity} = useCommunityData()

    const isJoined= !!communityStateValue.mySnippets.find((item)=>{
        return item.id === communityData.id
      
    })
  return (
    <Flex direction="column" width="100%" height="150px">
      <Box height="50%" bg="blue.400" />
      <Flex bg="white" flexGrow={1} justify="center">
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image alt="community logo" />
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
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header