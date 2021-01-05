import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Divider} from "@material-ui/core";
import NoticeCard from '../profile/noticeCard';
export default function MediaControlCard(props) {
        // console.log(props.notices)
        if(props.notices.length==0){
            return(
                <h3>No new notice</h3>
            )
        }
        else{
            return(
                <div>
                    {props.notices.map((notice=>{
                        return (
                            <NoticeCard notice = {notice}/>
                        )
                    }))
                    }
                </div>
            )
        }
    
}