


export const tokenService = {
    getTokenFromStorage: () => {
        try {
            const token = JSON.parse(window.localStorage.getItem('AUTH'));
            return token;
        } catch (error) {
            console.error('Parsing error');
            return null;
        }
    },
    addTokenToStorage: (tokenData) => {
        window.localStorage.setItem(
            'AUTH',
            JSON.stringify(tokenData)
        );
    },
    removeTokenFromStorage: () => {
        window.localStorage.removeItem('AUTH');
    }
}