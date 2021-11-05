import React from 'react';

export function useEditUser(users, openDialog) {
    const [edit, setEdit] = React.useState(false);
    const [id, setId] = React.useState('');
    const [user, setUser] = React.useState(null);

    const handleEdit = (id) => {
        setEdit(true);
        setId(id);
        const foundUser = users.find(u => u.id === id);
        setUser(foundUser);
        openDialog();
    }


    const cancelEdit = () => setEdit(false);


    return { edit, user, handleEdit, cancelEdit };
}