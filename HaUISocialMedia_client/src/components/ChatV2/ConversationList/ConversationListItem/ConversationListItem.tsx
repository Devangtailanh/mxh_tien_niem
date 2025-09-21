import React, { useEffect, memo, useState } from "react";
import "./ConversationListItem.css";
import LocalStorage from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import { observer } from "mobx-react";
import { format, parseISO } from "date-fns";

function ConversationListItem(props: any) {
  const { authStore, chatStore } = useStore();
  const { setChosenRoom, chosenRoom } = chatStore;
  const currentUser = LocalStorage.getLoggedInUser();

  const { id, avatar, name, code, participants, messages } = props.room;

  function renderConversationName() {
    if (!name || name.trim() === "") {
      const currentUser = LocalStorage.getLoggedInUser();
      for (let i = 0; i < participants?.length; i++) {
        const participant = participants[i];
        if (participant?.id !== currentUser?.id) {
          return `${participant?.lastName} ${participant?.firstName}`;
        }
      }
      return "No name conversation";
    }
    return name;
  }

  function renderLastMessageInConversation() {
    if (messages && messages?.length > 0) {
      const lastMessage = messages[messages?.length - 1];
      if (lastMessage?.messageType?.name === "sticker") {
        return "Đã gửi một sticker";
      }

      return lastMessage?.content;
    }
    return "";
  }

  const [imagePath, setImagePath] = useState(
    "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"
  );

  function renderAvatar() {
    if (
      participants &&
      participants?.length > 0 &&
      participants?.length === 2
    ) {
      let chattingPerson = null;

      for (let i = 0; i < participants?.length; i++) {
        const participant = participants[i];
        if (participant?.id !== currentUser?.id) {
          chattingPerson = participant;
          break;
        }
      }

      //handle if it is private chat (for 2 people)
      if (
        chattingPerson &&
        chattingPerson?.avatar &&
        chattingPerson?.avatar != ""
      ) {
        setImagePath(chattingPerson.avatar);
      } else {
        setImagePath(
          "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"
        );
      }
    }

    //handle if is group chat
    if (participants && participants?.length > 0 && participants?.length >= 3) {
      if (avatar && avatar?.length > 0) {
        setImagePath(avatar);
      } else {
        setImagePath(
          "https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png"
        );
      }
    }
  }

  useEffect(renderAvatar, [id, avatar]);

  function renderSentDate() {
    if (messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage?.sendDate)
        return format(parseISO(lastMessage?.sendDate), "d/M/yyyy");
    }
    return "";
  }

  function handleChooseConversation() {
    setChosenRoom(props.room);
  }

  return (
    <div
      className={`conversation-list-item ${
        chosenRoom?.id === id && " conversation-list-item--chosen"
      }`}
      onClick={handleChooseConversation}
    >
      <img className="conversation-photo" src={imagePath} alt="" />
      <div className="conversation-info flex-1">
        <h1 className="conversation-title">{renderConversationName()}</h1>
        <p className="conversation-snippet">
          {renderLastMessageInConversation()}
        </p>
      </div>
      <div className="conversation-timestamp"> {renderSentDate()} </div>
    </div>
  );
}

export default memo(observer(ConversationListItem));
