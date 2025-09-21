import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import fileUpload from "@/assets/file-upload.svg";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Icon from "../shared/Icon";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string[];
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>(mediaUrl);
  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1); // Xóa tệp khỏi danh sách tệp
    setFile(updatedFiles);

    const updatedUrls = [...fileUrls];
    updatedUrls.splice(index, 1); // Xóa URL khỏi danh sách URL
    setFileUrls(updatedUrls);
    fieldChange(updatedFiles);
  };
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const newFiles = [...file, ...acceptedFiles]; // Thêm các tệp mới vào danh sách hiện tại
      setFile(newFiles);
      fieldChange(newFiles);
      const newUrls = acceptedFiles.map(convertFileToUrl); // Chuyển đổi tệp thành URL mới
      setFileUrls((prev) => [...prev, ...newUrls]); // Thêm các URL mới vào danh sách URL hiện tại
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
    <>
      {fileUrls && (
        <>
          <div className="flex  justify-center flex-1 flex-wrap gap-3 mb-5 ">
            {fileUrls.map((url, index) => (
              <div key={index} className="relative ">
                <img
                  src={url}
                  alt="image"
                  className="w-28 h-28 object-cover rounded-sm"
                />
                <button
                  className="absolute -top-2 -right-2 p-[2px] rounded-full bg-red-500 text-white text-xs"
                  onClick={(e) => {
                    e.stopPropagation;
                    handleRemoveImage(index);
                  }}
                >
                  <Icon name="X" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        {...getRootProps()}
        className="flex flex-center flex-col  rounded-xl cursor-pointer "
      >
        <input {...getInputProps()} className="cursor-pointer" />

        {!fileUrls ||
          (fileUrls.length === 0 && (
            <div className=" flex flex-col items-center border h-40 w-full rounded-md">
              <h3 className="base-medium text-black mb-2 mt-6">
                Kéo thả ảnh ở đây
              </h3>
              <p className="text-black small-regular mb-6">SVG, PNG, JPG</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default FileUploader;
