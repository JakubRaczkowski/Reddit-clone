import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { Community } from "../../../atoms/CommunitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";
type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  console.log(communityData);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent> 
      <><div>LEFT</div></>
      <div>RIGHT</div>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    //POSSIBLY CREATE CUSTOM ERROR PAGE
    console.log("getServerSideProps error", error);
    return {
      props: {
        communityData: null,
      },
    };
  }
}

export default CommunityPage;
