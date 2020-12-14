import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Typography, Divider} from "@material-ui/core";
export default function MediaControlCard(props) {
    let data = props.hostel
        return(
            <div>
            <Typography component="h5" variant="h5" color="textPrimary" gutterBottom fontFamily = 'Segoe UI' align='center'>
                <strong>Hostel Information</strong>
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" gutterBottom fontFamily = 'Segoe UI'>
                <strong>Block: </strong>{data.block.number}
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                <strong>Floor: </strong>{data.floor.number}
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                <strong>Room No.: </strong>{data.room.number}
            </Typography>
        </div>
        )
    
}