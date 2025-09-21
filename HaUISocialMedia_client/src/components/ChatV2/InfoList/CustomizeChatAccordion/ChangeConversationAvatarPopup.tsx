import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { Modal, Box, Typography, Button, styled } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useStore } from "@/stores";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import FaceBookCircularProgress from "../../FaceBookCircularProgress";
import { handleUploadImage } from "@/lib/utils";

function ChangeConversationNamePopup(props: any) {
  const { open, handleClose } = props;

  const { chatStore } = useStore();
  const { uploadRoomAvatar } = chatStore;

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  async function handleChangeImage(event: any) {
    setIsUpdating(true);

    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      try {
        toast.info("Cuộc trò chuyện đang được cập nhật, vui lòng đợi...");
        const url = await handleUploadImage(img);

        await uploadRoomAvatar(url);
        toast.success("Thay đổi ảnh cuộc trò chuyện thành công!");
      } catch (error) {
        toast.error("Có lỗi xảy ra!!! Vui lòng thử lại sau");
      } finally {
        setIsUpdating(false);
      }
    } else {
      toast.error("Ảnh cuộc trò chuyện có lỗi");
    }
  }

  return (
    <Modal className="max-z-index" open={open} onClose={handleClose}>
      <Box
        className="modal-container w-80 p-0 m-0"
        sx={{ border: 0, borderRadius: "10px" }}
      >
        <div
          className="modalContainer flex-center justify-between appHeader"
          style={{ borderRadius: "10px 10px 0 0" }}
        >
          <Typography
            className="p-3"
            variant="h5"
            sx={{ fontWeight: 800, color: "#fff" }}
          >
            Cập nhật ảnh cuộc trò chuyện
          </Typography>
          <Button
            className="btnClose m-0 p-2 br-50p mw-unset"
            sx={{ color: "#fff" }}
            onClick={function () {
              handleClose();
            }}
          >
            <ClearIcon />
          </Button>
        </div>

        <div className="flex-center w-100 p-3 flex-column">
          {isUpdating && <FaceBookCircularProgress />}

          <Button
            fullWidth
            className="mt-2"
            component="label"
            variant="contained"
            disabled={isUpdating}
            startIcon={<CloudUploadIcon />}
            onChange={handleChangeImage}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default memo(observer(ChangeConversationNamePopup));
