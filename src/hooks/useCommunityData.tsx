import {
  communityState,
  Community,
  CommunitySnippet,
} from "@/atoms/CommunitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
  
} from "firebase/firestore";
import { write } from "fs";
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

      const snippets = snippetDoc.docs.map(doc => ({ ...doc.data() }));
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: snippets as Array<CommunitySnippet>,
      }));

      setIsLoading(false);
    } catch (error) {
      console.log("getMySnippets error", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const joinCommunity = async (communityData: Community) => {
    setIsLoading(true);
    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid!}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );

      batch.update(doc(firestore, `communities/${communityData.id}`), {
        numberOfMembers: increment(1),
      });

      await batch.commit();
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setIsLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    setIsLoading(true)
    try { 

      const batch= writeBatch(firestore)
      batch.delete(doc(firestore, `users/${user?.uid!}/communitySnippets`,communityId))
      batch.update(doc(firestore, 'communities', communityId),{
        numberOfMembers: increment(-1)
      })
      await batch.commit()
      setCommunityStateValue(prev=>({
        ...prev,
        mySnippets: prev.mySnippets.filter(item=>item.communityId !== communityId)
      }))
      
    } catch (error:any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
      
    }
    setIsLoading(false)
  };

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    isLoading,
  };
}

export default useCommunityData;
