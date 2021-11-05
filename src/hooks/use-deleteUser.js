import { useState, useEffect } from "react";
import { tokenService } from "../services/token-service";
import { sendDeleteUserRequest } from "../services/users-services";

export function useDeleteUser() {

    const [warning, setWarning] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);


    useEffect(() => {
        if (confirmDelete) {
            const authData = tokenService.getTokenFromStorage();
            const token = authData?.token;
            (async () => {
                try {
                    await sendDeleteUserRequest(deleteId, token);
                    setWarning(false);
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [deleteId, confirmDelete]);

    const handleWarningClose = () => setWarning(false);
    const handleWarningOpen = (id) => {
        setWarning(true);
        setDeleteId(id);
    }
    const handleDelete = (id) => {
        setConfirmDelete(true);
    }


    return {
        warning,
        deleteId,
        confirmDelete,
        handleDelete,
        handleWarningOpen,
        handleWarningClose
    };
}