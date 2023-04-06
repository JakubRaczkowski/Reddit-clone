import { authModalState } from "@/atoms/AuthModalAtom";
import {
  Community,
  CommunityState,
  communityState,
} from "@/atoms/CommunitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
type AboutProps = {
  communityData: Community;
};

const About = ({ communityData }: AboutProps) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFiles, setSelectedFiles, onSelectImage } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onUpdateImage = async () => {
    if (!selectedFiles) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFiles, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev: CommunityState) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      console.log(error.message, "onUpdateImage error bruh");
    }
    setUploadingImage(false);
  };
  return (
    <Box position="sticky" top="14px">
      <Flex
        bg="blue.400"
        justify="space-between"
        align="center"
        color="white"
        p="3"
        borderRadius="4px 4px 0 0"
      >
        <Text>About community </Text>
        <Icon as={HiOutlineDotsHorizontal}></Icon>
      </Flex>
      <Flex direction="column" p="3" bg="white" borderRadius="0 0 4px 4px">
        <Stack>
          <Flex
            direction="row"
            width="100%"
            p="2"
            fontSize="10pt"
            fontWeight="700"
          >
            <Flex direction="column" flexGrow="1">
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow="1">
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p="1"
            fontWeight="500"
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} mr="2" fontSize="18" />
            {communityData.createdAt && (
              <>
                <Text>
                  Created{" "}
                  {moment(
                    new Date(communityData.createdAt.seconds * 1000)
                  ).format("DD MM YYYY")}
                </Text>
              </>
            )}
          </Flex>

          {!user ? (
            <Button mt="3" height="30px" onClick={()=> setAuthModalState({isOpen:true, view:'login'})}>
              Create Post
            </Button>
          ) : (
            <>
              <Link href={`/r/${communityData.id}/submit`}>
                <Button mt="3" height="30px">
                  Create post
                </Button>
              </Link>
            </>
          )}
          
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing="1" fontSize="10pt">
                <Text fontWeight="600">Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    align="center"
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change image
                  </Text>
                  {communityData.imageURL || selectedFiles ? (
                    <Image
                      src={selectedFiles || communityData.imageURL}
                      alt="community image"
                      borderRadius="full"
                      boxSize="40px"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize="40px"
                      color="brand.100"
                      mr="2"
                    />
                  )}
                </Flex>

                {selectedFiles &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text cursor="pointer" onClick={onUpdateImage}>
                      Save Changes
                    </Text>
                  ))}
                <input
                  type="file"
                  ref={selectedFileRef}
                  hidden
                  onChange={onSelectImage}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
