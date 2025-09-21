import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCourseResult from "../../CourseResult/UserCourseResult";
import { observer } from "mobx-react";
import { Grid } from "@mui/material";

function Achievements(props: any) {
    const { profileId } = useParams();

    return (
        <Grid container spacing={2} className="pt-4">
            <Grid item xs={12}>
                <div className="infoCard">
                    <UserCourseResult userId={profileId as string} />
                </div>
            </Grid>
        </Grid>
    );
}

export default memo(observer(Achievements));