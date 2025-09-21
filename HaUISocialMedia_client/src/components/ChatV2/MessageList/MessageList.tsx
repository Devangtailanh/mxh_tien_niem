import { useEffect, memo, useRef } from 'react';
import Compose from './Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import Message from './Message/Message';
import './MessageList.css';
import { observer } from 'mobx-react';
import { useStore } from '@/stores';
import MessageListLoadingSkeleton from './MessageListLoadingSkeleton';
import NoData from '@/components/shared/NoData';
import FaceBookCircularProgress from '../FaceBookCircularProgress';

function MessageList(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { authStore, chatStore } = useStore();
  const {
    isLoading,
    chosenRoom,
    isLoadingMore,
    handleLoadMoreMessages
  } = chatStore;

  const { getLoggedInUser } = authStore;
  // const isLoading = true;
  const MY_USER_ID = getLoggedInUser()?.username;

  const scrollToBottom = () => {
    if (ref?.current) {
      ref.current.scrollTop = ref?.current?.scrollHeight;
      // console.log(ref.current.scrollHeight)
    }
  };

  const renderMessages = () => {
    const messages = chosenRoom?.messages || [];
    let i = 0;
    let messageCount = messages?.length;
    let tempArray = [];
    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      // console.log("current", current);
      let next = messages[i + 1];
      let prevType = previous && previous?.messageType?.name;
      let type = current?.messageType?.name;
      let nextType = next && next?.messageType?.name;
      let prevUser = previous && prevType == "chat" ? previous?.user?.username : null;
      let currUser = type == "chat" ? current?.user?.username : null;
      let nextUser = next && nextType == "chat" ? next?.user?.username : null;
      let isMine = current?.user?.username === MY_USER_ID;
      let startsSequence = true;
      let endsSequence = false;
      let photo = !isMine && current?.user?.avatar != null
        ? current?.user?.avatar : 'https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg';
      let sendDate = current?.sendDate;
      if (previous && prevUser === currUser) {
        startsSequence = false;
      }

      if (next && nextUser !== currUser) {
        endsSequence = true;
      }

      tempArray.push(
        <Message
          key={i}
          isMine={isMine}
          type={type}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          data={current?.content}
          author={current?.user?.username}
          photo={photo}
          sendDate={sendDate}
        />
      );
      i += 1;
    }
    return tempArray;
  }

  useEffect(function () {
    scrollToBottom();

  }, [chosenRoom?.messages?.length, chosenRoom]);

  function handleScrollMessageContainer(e: React.UIEvent<HTMLElement>) {
    if (e?.currentTarget?.scrollTop == 0) {
      handleLoadMoreMessages();
    }
  }

  return (
    <div className="message-list">
      <Toolbar title="" />

      <div className="message-list-container flex-1" id="messageListContainer" ref={ref} onScroll={handleScrollMessageContainer}>
        {isLoading ? (
          <MessageListLoadingSkeleton />
        ) : (
          <>
            {!chosenRoom ? (
              <div className="no-message">
                <NoData
                  title={'Chưa có cuộc trò chuyện nào được chọn'}
                  style="h-[80px] w-[80px]"
                />
              </div>
            )
              :
              (
                <>
                  {isLoadingMore && (
                    <div className="flex-center w-100">
                      <FaceBookCircularProgress />
                    </div>
                  )}

                  {
                    renderMessages()
                  }
                </>
              )
            }
          </>
        )}
      </div>
      <Compose></Compose>
    </div>
  );
}

export default memo(observer(MessageList));