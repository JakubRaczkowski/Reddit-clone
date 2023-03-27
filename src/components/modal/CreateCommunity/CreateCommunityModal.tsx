import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore, auth } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { runTransaction } from "firebase/firestore";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal = ({
  open,
  handleClose,
}: CreateCommunityModalProps) => {
  const [communityName, setCommunityName] = useState("");
  const [charactersRemaining, setCharactersRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharactersRemaining(21 - e.target.value.length);
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError("Community name ");
      return;
    }
    setIsLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      // CREATING TRANSACTIONS- these allow to perform multiple operations on the database at once
      // fail if any operation fails and only succeeed if all operations succeed
      // this allows to upkeep database integrity
      // doesnt pollute the database with half completed operations.
      await runTransaction(firestore, async transaction => {
        // CHECKING IF COMMUNITY ALREADY EXISTS WITH THE SAME SAME
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `Sorry r/${communityName} is taken.Try another name.`
          );
        }

        // CREATING COMMUNITY DOCUMENT
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // SECOND OPERATION OF TRANSACTION > CREATING COMMUNITY ON USER DOCUMENT
        transaction.set(doc(firestore,`users/${user?.uid}/communitySnippets`, communityName),{
          communityId: communityName,
          isModerator: true,
          
        })
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setError("");
    setCommunityName("");
    setCharactersRemaining(21);
    setCommunityType("public");
  }, [open]);

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize="15pt"
            padding="3"
          >
            Create a community
          </ModalHeader>
          <Box px="3">
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize="15pt">
                Name
              </Text>
              <Text fontSize="14" color="gray.500">
                Community names including capitalization cannot be changed.
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                /r
              </Text>
              <Input
                position="relative"
                size="sm"
                pl="22px"
                maxLength={21}
                value={communityName}
                onChange={handleChange}
              ></Input>
              <Text
                fontSize="12px"
                mt="1"
                color={charactersRemaining ? "gray.500 " : "red"}
              >
                {charactersRemaining} Characters remaining.
              </Text>
              <Text pt="1" color="red" fontSize="9pt ">
                {error}
              </Text>
              <Box my="4">
                <Text fontWeight="600" fontSize="15">
                  Community type
                </Text>
                <Stack spacing="2">
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={checkboxHandler}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />

                      <Text fontSize="10pt" mr="1">
                        Public
                      </Text>
                      <Text fontSize="8pt" mr="1" color="gray.500">
                        Anyone can view, post and comment to this community.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={checkboxHandler}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr="1">
                        Restricted
                      </Text>
                      <Text fontSize="8pt" mr="1" color="gray.500">
                        Anyone can view, post , but only approved users can
                        post.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={checkboxHandler}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr="1">
                        Private
                      </Text>
                      <Text fontSize="8pt" mr="1" color="gray.500">
                        Only approved users can view and submit to this
                        community.
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCommunity}
              variant="solid"
              height="30px"
              isLoading={isLoading}
            >
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;

//  Trying out this code first :

//  const calcCharactersRemaining = (communityName: string) => {
//    if (communityName.length > 21) return;
//    return setCharactersRemaining(21 - communityName.length);
//  };
//  useEffect(() => {
//    calcCharactersRemaining(communityName);
//  }, [communityName]);
