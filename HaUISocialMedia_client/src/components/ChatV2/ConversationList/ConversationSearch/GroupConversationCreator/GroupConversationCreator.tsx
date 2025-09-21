import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { Modal, Box, List, Typography, TextField, Button } from "@mui/material";
import { useStore } from "@/stores";
import ChooseUserItem from "./ChooseUserItem";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import "./GroupConversationCreator.css";
import FaceBookCircularProgress from "../../../FaceBookCircularProgress";

function GroupConversationCreator(props: any) {
  const { open, handleClose } = props;
  const { chatStore, relationshipStore } = useStore();
  const { getAllFriends, currentFriends } = relationshipStore;
  const { createGroupChat } = chatStore;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    setIsLoading(true);

    getAllFriends()
      .finally(function () {
        setIsLoading(false);
      })
  }, []);

  const [conversationName, setConversationName] = useState("");
  function handleChangeConversationName(event: any) {
    const { value } = event.target;
    setConversationName(value);
  }

  const [isUpdating, setIsUpdating] = useState(false);
  async function handleCreateNewGroupChat() {
    setIsUpdating(true);
    setIsLoading(true);

    const sendData = {
      name: conversationName,
      joinUserIds: joinUserIds,
    };

    if (sendData.joinUserIds.length < 2) {
      toast.info("Chọn ít nhất 2 người bạn để sử dụng tính năng này");
      setIsUpdating(false);
      setIsLoading(false);
      return;
    }

    const data = await createGroupChat(sendData);
    toast.success("Tạo cuộc trò chuyện " + data?.name + " thành công!");

    setIsUpdating(false);
    setIsLoading(false);
    handleClose();
  }

  const [joinUserIds, setJoinUserIds] = useState([]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <div
          className=" w-full flex-center justify-between p-3"
          style={{ background: "#0047ab", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        >
          <div>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "#fff" }}
            >
              Tạo cuộc trò chuyện nhóm mới
            </Typography>
          </div>
          <Button
            className="btnClose m-0 p-2 br-50p mw-unset"
            sx={{ color: "#fff" }}
            onClick={() => handleClose()}
          >
            <ClearIcon />
          </Button>
        </div>

        <div className="modal-container-content p-3">
          <TextField
            id="standard-basic"
            label="Nhập tên cuộc trò chuyện mới..."
            variant="standard"
            onChange={handleChangeConversationName}
            value={conversationName}
            className="w-100 py-1"
            disabled={isLoading || isUpdating}
          />

          <List dense sx={{ width: "100%" }} className="flex-column">
            <p className="text-center">Chọn người tham gia</p>


            {isLoading && (
              <div className="flex-center w-100">
                <FaceBookCircularProgress />
              </div>
            )}

            {!isLoading && currentFriends.map((user: any, index: number) => {
              const labelId = `checkbox-list-secondary-label-${index}`;

              return (
                <ChooseUserItem
                  key={index}
                  labelId={labelId}
                  user={user}
                  joinUserIds={joinUserIds}
                  setJoinUserIds={setJoinUserIds}
                />
              );
            })}
          </List>

          <div className="flex-center justify-right ">
            <Button
              variant="contained"
              onClick={function () {
                handleClose();
              }}
              className="mr-2"
              disabled={isUpdating}
            >
              <ClearIcon className="mr-2" />
              Hủy bỏ
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleCreateNewGroupChat}
              disabled={isUpdating}
            >
              <SendTimeExtensionIcon className="mr-2" />
              Xác nhận
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default memo(observer(GroupConversationCreator));
