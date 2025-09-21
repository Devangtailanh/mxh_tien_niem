import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FriendOfUser from "@/components/Relationship/FriendOfUser";
import { observer } from "mobx-react";
import { Grid } from "@mui/material";

function UserFriends(props: any) {
    const { profileId } = useParams();

    return (
        <Grid container spacing={2} className="pt-4">
            <Grid item xs={12}>
                <div className="infoCard">
                    <FriendOfUser profileId={profileId as string} />
                </div>
            </Grid>
        </Grid>
    );
}

export default memo(observer(UserFriends));