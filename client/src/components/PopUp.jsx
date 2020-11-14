import { Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import React from 'react'

export default function PopUp(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    // console.log(openPopup);
    return (
        
        <Dialog open = {openPopup}>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
