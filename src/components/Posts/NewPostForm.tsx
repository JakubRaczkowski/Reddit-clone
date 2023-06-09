import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import PostTabItem from "./PostTabItem";
import { useState } from "react";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/PostAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "@/hooks/useSelectFile";

const formTabs: TabItem[] = [
  { title: "Post", icon: IoDocumentText },
  { title: "Image & Videos", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const NewPostForm = ({ user,communityImageURL }: NewPostFormProps) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { selectedFiles, setSelectedFiles, onSelectImage } = useSelectFile();

  const router = useRouter();

  const createPostHandler = async () => {
    const { communityId } = router.query;
    //@ts-ignore
    const newPost: Post = {
      title: textInputs.title,
      body: textInputs.body,
      communityId: communityId as string,
      communityImageURL: communityImageURL || "",
      creatorDisplayName: user.email!.split("@")[0],
      creatorId: user.uid as string,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      // this stores the created post in the posts collection
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      console.log("HERE IS NEW POST ID", postDocRef.id);

      // next step is to check if with the post come the files
      // if so, we need to store the files in the storage
      if (selectedFiles) {
        // if the files exist we store them in the storage
        // and then we store the file url in the post document
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFiles, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        // update post document with image url
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error: any) {
      console.log(error.message, "createPostHandler error");
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Flex direction="column" borderRadius="4" bg="white" mt="2">
      <Flex width="100%">
        {formTabs.map(item => {
          return (
            <PostTabItem
              key={item.title}
              item={item}
              selected={item.title === selectedTab}
              setSelected={setSelectedTab}
            />
          );
        })}
      </Flex>
      <Flex p="4">
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            createPostHandler={createPostHandler}
            loading={loading}
          />
        )}
        {selectedTab === "Image & Videos" && (
          <ImageUpload
            onSelectImage={onSelectImage}
            selectedFile={selectedFiles}
            onSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFiles}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr="2">Failed to create post. </AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
