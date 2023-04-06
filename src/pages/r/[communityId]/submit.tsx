import React from "react";
import PageContent from "@/components/Layout/PageContent";
import { Box } from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/CommunitiesAtom";
import About from "@/components/Community/About";
import useCommunityData from "@/hooks/useCommunityData";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  return (
    <PageContent>
      <>
        <Box
          borderBottom="1px solid"
          borderColor="white"
          p="14px 0"
          fontSize="24px"
        >
          Create a post
        </Box>
        {user && <NewPostForm user={user} />}{" "}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
