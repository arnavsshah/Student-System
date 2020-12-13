import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

export default function DisplayProfile(props) {
    // console.log("inside display profile", props.queryData)
    return(
        <>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom fontFamily = 'Segoe UI'>
                    {props.attributeData.attribute}
        </Typography>
        <ul>
        {props.attributeData.name.map((n)=>{
            // console.log("profile", profile[0]);
            return(
                <li>{n}</li>
            );
        })
        } 
        </ul>
        </>
    );

}