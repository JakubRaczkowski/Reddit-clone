import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { useRef } from "react";

type ImageUploadProps = {
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: string;
  onSelectedTab: (tab: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload = ({
  onSelectImage,
  selectedFile,
  onSelectedTab,
  setSelectedFile,
}: ImageUploadProps) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex align="center" justify="center" width="100%">
      {selectedFile ? (
        <Flex direction="column">
          <Image src={selectedFile} alt="chosen file" width="100%" maxWidth='400' maxHeight='400' />
          <Stack  direction='row' justify="center" align="center" gap="2" mt="3">
            <Button height="28px" p='6' variant='solid' onClick={() =>{onSelectedTab('Post')}}>Back to post </Button>
            <Button height="28px" p='6' variant='outline' onClick={()=>{setSelectedFile('')}}>Remove </Button>
          </Stack>
        </Flex>
      ) : (
        <Flex
          justify="center"
          align="center"
          p="20"
          border="1px dashed"
          borderRadius="4"
          borderColor="gray.200"
          width="100%"
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            type="file"
            ref={selectedFileRef}
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
