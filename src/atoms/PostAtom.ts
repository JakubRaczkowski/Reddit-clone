import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Post {
//   id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  createdAt: Timestamp;
  imageURL?: string;
  communityImageURL?: string;
}

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  // postVotes
}

const DefaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
    key: "postState",
    default: DefaultPostState,
})
