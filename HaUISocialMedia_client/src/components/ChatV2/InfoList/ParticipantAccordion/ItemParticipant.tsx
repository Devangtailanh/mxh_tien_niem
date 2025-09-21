import { Tooltip } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { useStore } from "@/stores";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router";

function ItemParticipant(props: any) {
    const navigate = useNavigate();
    const { participant } = props;

    const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');

    function renderAvatar() {
        if (participant && participant?.avatar && participant?.avatar != "") {
            setImagePath(participant?.avatar);
        }
    }

    useEffect(renderAvatar, []);

    return (
        <div className="flex-center py-2 px-4 justify-left list-item m-1" onClick={() => navigate(`/profile/${participant?.id}`)}>
            <img className="participant-photo" src={imagePath} alt="" />
            <div className="participant-info flex-1">
                <h1 className="participant-title">{participant?.username}</h1>
            </div>
            {/* <div className="participant-timestamp">
                <Tooltip title='View this user profile' enterDelay={100} leaveDelay={100} arrow>
                    <AccountCircleIcon></AccountCircleIcon>
                </Tooltip>
            </div> */}
        </div>
    );
}

export default memo(observer(ItemParticipant));