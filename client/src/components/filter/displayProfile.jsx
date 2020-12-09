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

    return(
        props.queryData.map((profile)=>{
            <ProfileCard data = {profile}/>
        }) 
    );

}