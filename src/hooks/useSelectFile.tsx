import { useState } from "react";

const useSelectFile = () => {
  const [selectedFiles, setSelectedFiles] = useState<string>();

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    if (file) reader.readAsDataURL(file);
    reader.onload = readerEvent => {
      if (readerEvent.target?.result)
        setSelectedFiles(readerEvent.target.result as string);
    };
  };
  return {
    selectedFiles,
    setSelectedFiles,
    onSelectImage,

  }
};

export default useSelectFile;
