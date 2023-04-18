import { Community } from "@/atoms/CommunitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { query, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const Recommendations = () => {

    const [communites,setCommunites] = useState<Community[]>([])
    const [loading,setLoading] = useState(false)    
    const {communityStateValue,onJoinOrLeaveCommunity} = useCommunityData()

  const getTopCommunity = async () => {
    try {
        const communityQuery = query(collection(firestore, "communities"),)
    } catch (error) {
      console.log(error, "error in getTopCommunity");
    }

};
useEffect(() => {
    getTopCommunity()
}, [])
  return <></>;
};

export default Recommendations;
