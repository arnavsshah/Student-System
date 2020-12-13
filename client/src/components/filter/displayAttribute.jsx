import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    b:{
        marginLeft: theme.spacing(2),
    }
}));

export default function DisplayProfile(props) {
    const classes = useStyles();
    // console.log("inside display profile", props.queryData)
    return(
        <div className = {classes.b}>
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom fontFamily = 'Segoe UI'>
                        {props.attributeData.attribute}
            </Typography> 
            <Typography component="h5" variant="h5" align="left" color="textPrimary" gutterBottom fontFamily = 'Segoe UI'>
            
            <ol>
            {props.attributeData.name.map((n)=>{
                // console.log("profile", profile[0]);
                return(
                    <li>{n}</li>
                    // <h5>hello</h5>
                );
            })
            } 
            </ol>
            </Typography> 
        </div>
            
        
    );

}