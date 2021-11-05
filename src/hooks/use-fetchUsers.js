import React from "react";

import { fetchAllUsers } from "../services/users-services";
import { AuthContext } from "../context/auth-context";
import { ErrorCode } from "../constants";
import { tokenService } from "../services/token-service";

const { UNAUTHORIZED, NOT_ADMIN } = ErrorCode;



export function useFetchUsers() {

    const authContext = React.useContext(AuthContext);

    const [isAdmin, setIsAdmin] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        (async () => {
            try {
                const response = await fetchAllUsers(token);
                setUsers(response.data);
                setIsAdmin(true);
            } catch (error) {
                if (error.name === UNAUTHORIZED) authContext.logout();
                if (error.name === NOT_ADMIN) setIsAdmin(false);
            }
        })();
    }, [authContext]);

    return { isAdmin, users, }

}