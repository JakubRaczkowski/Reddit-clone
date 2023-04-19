import { Community } from "@/atoms/CommunitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import {
  Flex,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { FaReddit } from "react-icons/fa";

const Recommendations = () => {
  const [communities, setCommunites] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getTopCommunity = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
        
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      setCommunites(communities as Community[]);
    } catch (error) {
      console.log(error, "error in getTopCommunity");
    }

    setLoading(false);
  };
  useEffect(() => {
    getTopCommunity();
  }, []);
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius="4"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight="700"
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)),url(/images/recCommsArt.png)"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {loading ? (
          <>
            <Stack mt="2" p="3">
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70px" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70px" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70px" />
              </Flex>
            </Stack>
          </>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                snippet => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex
                    position='relative'
                    align="center"
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    p="10px 12px"
                  >
                    <Flex width="80%" align="center">
                      <Flex width="15%">
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex width="80%" align="center">
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            borderRadius="full"
                            boxSize="28px"
                            mr="2"
                            alt="community image"
                            cursor="pointer"
                          />
                        ) : (
                          <Icon
                            as={FaReddit}
                            color="brand.100"
                            fontSize="30px"
                            mr="2"
                            cursor="pointer"
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Text>{`r/${item.id}`}</Text>
                        </span>
                      </Flex>
                    </Flex>
                    <Box position='absolute' right='10px'>
                      <Button onClick={event => {
                        event.preventDefault()
                        onJoinOrLeaveCommunity(item,isJoined)
                        

                      }} height='22px' fontSize='8pt' variant={isJoined ? "outline" : 'solid'}>
                        {isJoined? 'Joined' : 'Join'}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p='10px 20px'>
              <Button height='30px'width='100%'  >View all</Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
