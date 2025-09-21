import { memo, useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import { observer } from "mobx-react";

type Props = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

function BackgroupUpload({ fieldChange, mediaUrl }: Props) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()} className="w-full">
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex flex-col gap-4">
        <img
          src={fileUrl || ""}
          className="h-[200px] w-full rounded-md object-cover object-center"
        />
        <p className="text-primary small-regular md:bbase-semibold bg-blue-100 max-w-max p-2 rounded-md">
          Thay đổi ảnh nhóm
        </p>
      </div>
    </div>
  );
}

export default memo(observer(BackgroupUpload));
