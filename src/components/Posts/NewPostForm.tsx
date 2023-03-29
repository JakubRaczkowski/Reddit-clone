import { Flex, Icon } from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import PostTabItem from "./PostTabItem";
import { useState } from "react";
import TextInputs from "./PostForm/TextInputs";

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

const NewPostForm = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<string>();
  const [loading,setLoading] = useState(false); 
  const createPostHandler = async () => {};

  const onSelectImage = () => {};

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
        {selectedTab === "post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            createPostHandler={createPostHandler}
            loading={false}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
