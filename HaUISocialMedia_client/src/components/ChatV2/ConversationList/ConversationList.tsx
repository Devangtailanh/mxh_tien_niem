import React, { useState, useEffect, memo } from "react";
import ConversationSearch from "./ConversationSearch/ConversationSearch";
import ConversationListItem from "./ConversationListItem/ConversationListItem";
import Toolbar from "../Toolbar/Toolbar";

import "./ConversationList.css";
import { useStore } from "@/stores";
import { observer } from "mobx-react";
import ConversationListItemLoadingSkeleton from "./ConversationListItem/ConversationListItemLoadingSkeleton";
import NoData from "@/components/shared/NoData";

function ConversationList() {
  const { chatStore } = useStore();
  const { joinedRooms, isLoading } = chatStore;

  return (
    <div>
      <Toolbar title="">
        <ConversationSearch />
      </Toolbar>
      <div className="conversation-list flex-column">
        <div className="conversationListItemWrapper">
          {
            // if is loading, render skeleton
            isLoading ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7].map(function (_, index) {
                  return <ConversationListItemLoadingSkeleton key={index} />;
                })}
              </>
            ) : (
              // if is not loading, render data
              <>
                {joinedRooms.map(function (room: any, index: number) {
                  return <ConversationListItem key={index} room={room} />;
                })}
                {(!joinedRooms || joinedRooms.length === 0) && !isLoading && (
                  <div className="no-conversation p-4">
                    <NoData
                      title={
                        <p>
                          Bạn chưa có cuộc trò chuyện nào <br /> Hãy tìm kiếm
                          thêm bạn bè nào
                        </p>
                      }
                      style="h-[80px] w-[80px]"
                    />
                  </div>
                )}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default memo(observer(ConversationList));
