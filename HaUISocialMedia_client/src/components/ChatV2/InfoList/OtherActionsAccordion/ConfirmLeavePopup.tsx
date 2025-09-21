import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "@/stores";
import LogoutIcon from '@mui/icons-material/Logout';
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

function ConfirmLeavePopup(props: any) {
    const { open, handleClose } = props;
    const [isUpdating, setIsUpdating] = useState(false);
    const { chatStore } = useStore();
    const { chosenRoom, leaveConversation } = chatStore;

    async function handleConfirmLeave() {
        setIsUpdating(true);
        toast.info("Vui lòng đợi, yêu cầu của bạn đang được xử lí");

        await leaveConversation();

        toast.success("Bạn đã rời khỏi cuộc trò chuyện!");
        setIsUpdating(false);
        handleClose();
    }

    return (
        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Formik
                initialValues={{ name: chosenRoom?.name }}
                onSubmit={handleConfirmLeave}
            >
                {(props) => (
                    <Form autoComplete='off'>
                        <Box className='modal-container w-80 p-0 m-0' sx={{ border: 0, borderRadius: "10px" }}>
                            <div className="modalContainer flex-center justify-between appHeader" style={{ borderRadius: "10px 10px 0 0" }}>
                                <Typography className="p-3" variant='h5' sx={{ fontWeight: 800, color: "#fff" }}>XÁC NHẬN!!!</Typography>
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

                            <div className="flex-center w-100 p-3">
                                <h6 className="m-0 p-0 text-center">
                                    Bạn có chắc chắn muốn rời khỏi cuộc trò chuyện?
                                    <br></br>
                                    Bạn sẽ không thể quay lại cho đến khi bạn của bạn thêm bạn vào lại
                                </h6>
                            </div>

                            <div className='flex-center justify-right p-3 '>
                                <Button
                                    variant="contained"
                                    onClick={function () {
                                        handleClose();
                                    }}
                                    className="mr-2 flex-center"
                                    disabled={isUpdating}
                                >
                                    <ClearIcon
                                        className=""
                                    />
                                    Hủy bỏ
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    disabled={isUpdating}
                                    className="flex-center"
                                    type="submit"
                                >
                                    <LogoutIcon
                                        className="mr-2"
                                    />
                                    Vẫn rời đi
                                </Button>
                            </div>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Modal >
    );
}

export default memo(observer(ConfirmLeavePopup));