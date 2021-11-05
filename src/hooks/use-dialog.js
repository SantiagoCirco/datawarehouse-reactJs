import { useState } from "react";


export function useDialog() {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => setDialogOpen(false);

    return { dialogOpen, handleDialogClose, handleDialogOpen };

}