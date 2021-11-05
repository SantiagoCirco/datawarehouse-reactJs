import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    list: {
        width: '80%',
        margin: 'auto',
    },
}));

export function UsersList({ users, handleEdit, handleDelete }) {

    const classes = useStyle();

    return (
        <List className={classes.list}>
            {
                users.map(user => (
                    <div key={user.id}>
                        <ListItem >
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}`}
                                secondary={user.email}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => handleEdit(user.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
        </List>
    );
}