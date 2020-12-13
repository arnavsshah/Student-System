import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Typography, Divider} from "@material-ui/core";
export default function MediaControlCard(props) {
    let data = props.notice;
    return(
        <div>
            <br/>
            <Typography component="h5" variant="h5" color="textPrimary" gutterBottom fontFamily = 'Segoe UI'>
                <strong>Title: </strong>{data.title}
            </Typography>
            <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                <strong>Content: </strong>{data.content}
            </Typography>
            <br/>
            <Divider/>
        </div>
        
    )
}