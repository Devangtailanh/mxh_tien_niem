import Icon from "@/components/shared/Icon";
import { StickerList } from "../StickerList";
import { useState } from "react";
import { useStore } from "@/stores";

const Stickers = () => {
  const [isStickerListVisible, setStickerListVisible] = useState(false);
  const { chatStore } = useStore();
  const { sendSticker } = chatStore;

  const toggleStickerListVisibility = () => {
    setStickerListVisible(!isStickerListVisible);
  };
  const handleSendMessage = (value: string) => {
    sendSticker(value);
    setStickerListVisible(false);
  };

  return (
    <div className="relative">
      <div onClick={toggleStickerListVisibility} className="cursor-pointer">
        <Icon name="Sticker" />
      </div>
      {isStickerListVisible && (
        <div className="absolute bottom-full right-0 z-10 mt-2 bg-white border border-gray-300 p-2 w-[500px] h-[400px] overflow-scroll">
          <div className="flex gap-3 flex-wrap w-full h-full">
            {StickerList.map((sticker, index) => (
              <div
                key={index}
                onClick={() => handleSendMessage(sticker.value.toString())}
              >
                <img
                  src={sticker.key}
                  alt="sticker"
                  className="size-16 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stickers;
