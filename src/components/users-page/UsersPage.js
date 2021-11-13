import React from "react";

import Divider from '@material-ui/core/Divider';

import { UsersList } from "./UsersList";
import { UserDialog } from "./UserDialog";
import { useDeleteUser } from '../../hooks/use-deleteUser';
import { NotAdminMessage } from "./NotAdminMessage";
import { useFetchUsers } from "../../hooks/use-fetchUsers";
import { Header } from "./Header";
import { WarningDialog } from "./warningDialog";

import { tokenService } from "../../services/token-service";
import { useForm } from '../../hooks/use-form';
import { validateForm, sendAddUserRequest, sendEditUserRequest } from '../../services/users-services';
import { throwCustomError, textConfig } from '../../constants';
import Userform from './UserForm';
import { useDialog } from "../../hooks/use-dialog";
import { useEditUser } from "../../hooks/use-editUser";


const initalValues = { firstName: '', lastName: '', email: '', password: '' }

export function UsersPage() {

    const { isAdmin, users } = useFetchUsers();
    const { dialogOpen, handleDialogOpen, handleDialogClose } = useDialog();
    const { warning, handleWarningOpen, handleWarningClose, handleDelete } = useDeleteUser();

    const handleAddUser = async (handleErrors) => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        try {
            const response = await sendAddUserRequest(values, token);
            if (!response.ok) throwCustomError(response);
            window.location.reload();
        } catch (error) {
            handleErrors(error);
        }
    }
    const handleEditUser = async (handleErrors) => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        try {
            const response = await sendEditUserRequest(user.id, token, values);
            console.log(response);
            if (!response.ok) throwCustomError(response);
            window.location.reload();
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    }
    const { edit, user, handleEdit, cancelEdit } = useEditUser(users, handleDialogOpen);

    const { values, errors, handleSubmit, handleChange } = useForm(
        edit ? handleEditUser : handleAddUser,
        validateForm,
        initalValues,
        { user, edit }
    );

    const handleAddUserDialogOpen = () => {
        cancelEdit();
        handleDialogOpen();
    }



    if (isAdmin) {
        return (
            <>
                <Header onClick={handleAddUserDialogOpen} />
                <Divider />
                {warning &&
                    <WarningDialog
                        warning={warning}
                        handleClose={handleWarningClose}
                        handleDelete={handleDelete}
                        textContent={{
                            title: 'Eliminar Usuario',
                            description: 'Una vez eliminado el usuario, no podrá volver a habilitarlo. ¿Está seguro que desea continuar?'
                        }}
                    />
                }
                <UsersList
                    users={users}
                    handleEdit={handleEdit}
                    handleDelete={handleWarningOpen} />
                <UserDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    onSubmit={handleSubmit}
                    text={edit ? textConfig.edit : textConfig.add}
                >
                    <Userform
                        values={edit ? user : values}
                        errors={errors}
                        handleChange={handleChange}
                    />
                </UserDialog>

            </>
        );
    } else {
        return <NotAdminMessage />
    }
}
