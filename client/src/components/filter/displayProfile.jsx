import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ProfileCard from "../profile/profileCard"
import {
    List,
    ListItem,
    TextField,
    ListItemText,
    Collapse,
    Divider,
    Button
} from "@material-ui/core";
export default function DisplayProfile(props) {
    // console.log("inside display profile", props.queryData)
    return(
        props.queryData.map((profile)=>{
            // console.log("profile", profile[0]);
            return(
                <ProfileCard data = {profile[0]}/>
            );
        }) 
    );

}