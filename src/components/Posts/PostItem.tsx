import { Post } from "@/atoms/PostAtom";

import { Flex, Icon, Text, Stack, Image } from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number | undefined;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
};

const PostItem = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}: PostItemProps) => {
  return (
    <Flex
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4"
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        bg="gray.100"
        align="center"
        p="2"
        width="40px"
        borderRadius="4"
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize="22"
          onClick={onVote}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize="22"
          onClick={onVote}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" bg="white" width="100%">
        <Stack spacing="1" p="10px">
          <Stack direction="row" spacing="0.6" align="center" fontSize="9pt">
            {/* HOME PAGE ? DISPLAY ICON : DONT DISPLAY ICON */}
            <Text>
              Created by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>

          <Text fontSize="12pt" fontWeight="600">
            {post.title}
          </Text>
          {post.imageURL && (
            <Flex justify="center" align="center" pt='2'>
              <Image  src={post.imageURL} maxHeight='460px' width='100%' alt='image'/>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PostItem;
