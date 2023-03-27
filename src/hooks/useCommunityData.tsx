import { communityState, Community } from "@/atoms/CommunitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { log } from "console";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

function useCommunityData() {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // FIRST CASE IS WHEN USER IS NOT SIGNED IN

    // SECOND CASE IS WHEN USER IS SIGNED IN
    if (isJoined) {
      // LEAVE COMMUNITY
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setIsLoading(true);
    try {
      const snippetDoc = await getDocs(
        collection(firestore, `users/${user?.uid!}/communitySnippets`)
      );
       
      const mySnippets = snippetDoc.docs.map((doc) =>( {...doc.data()}));
      console.log(mySnippets,'helloo');
    } catch (error) {
      console.log("getMySnippets error", error);
    }
  };
  useEffect(() => {
    if (!user) return;
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
}

export default useCommunityData;
