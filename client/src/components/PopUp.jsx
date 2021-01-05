import { Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import React from 'react'

export default function PopUp(props) {
    const {title, children, openPopup, handleClosePopUp} = props;
    // console.log(openPopup);
    
    return (
        
        <Dialog onClose={handleClosePopUp} open = {openPopup}>
            {/* {console.log("ggg", openPopup)} */}
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
