import React, { memo, useState, useEffect } from "react";
import "./Message.scss";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import { Sticker } from "lucide-react";
import { StickerList } from "../../StickerList";

function lightOrDark(color: any) {
  var r: any, g: any, b: any, hsp: any;

  color = +("0x" + color?.slice(1)?.replace(color?.length < 5 && /./g, "$&$&"));

  r = color >> 16;
  g = (color >> 8) & 255;
  b = color & 255;

  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) {
    // sang
    return true;
  } else {
    //toi
    return false;
  }
}

function Message(props: any) {
  const {
    data,
    author,
    type,
    isMine,
    startsSequence,
    endsSequence,
    photo,
    sendDate,
  } = props;

  const imagePath =
    photo ||
    "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg";

  const { authStore, chatStore } = useStore();
  const { chosenRoom } = chatStore;
  // const [bubbleBackground, setBubbleBackground] = useState(chosenRoom?.color);

  // useEffect(() => {
  //   bubbleBackground && setBubbleBackground(bubbleBackground);
  //   let bubble = document.querySelectorAll(".message.mine .bubble-container .bubble") as NodeListOf<HTMLElement>;
  //   bubble.forEach(item => {
  //     if (item) {
  //       item.style.backgroundColor = bubbleBackground;
  //       if (lightOrDark(bubbleBackground)) {
  //         item.style.color = "black";
  //       } else {
  //         item.style.color = "white";
  //       }
  //     }
  //   })
  // }, [chosenRoom?.id]);

  let mineMessageWithColor = {};
  if (isMine && type == "chat" && chosenRoom?.color) {
    let fontTheme = "white";
    if (lightOrDark(chosenRoom?.color)) {
      fontTheme = "black";
    }

    mineMessageWithColor = {
      backgroundColor: chosenRoom?.color,
      color: fontTheme,
    };
  }

  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`,
      ].join(" ")}
    >
      {type == "notification" && (
        <div className="notification">
          {format(parseISO(sendDate), "do MMMM yyyy")} <br />
          {data}
        </div>
      )}

      {type == "join" && <div className="notification">{data}</div>}

      {type == "left" && <div className="notification">{data}</div>}

      {type == "chat" && (
        <>
          {startsSequence && <div className="username">{author}</div>}
          <div className="user-container">
            {startsSequence && !isMine && (
              <img className="thumbnail" src={imagePath} alt=""></img>
            )}
            <div className="bubble-container">
              <div className="bubble" style={mineMessageWithColor}>
                {data}
              </div>
            </div>
          </div>
        </>
      )}

      {type == "sticker" && (
        <>
          {startsSequence && <div className="username">{author}</div>}
          <div className="user-container">
            {startsSequence && !isMine && (
              <img className="thumbnail" src={imagePath} alt=""></img>
            )}
            <div className="bubble-container">
              <img
                src={StickerList[data - 1]?.key}
                alt="sticker"
                className="w-16 object-cover mb-3 mr-1"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(observer(Message));
