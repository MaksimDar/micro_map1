const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return { ...state, currentUser: action.payload }
        case 'OPEN_LOGIN':
            return { ...state, openLogin: true }
        case 'CLOSE_LOGIN':
            return { ...state, openLogin: false }
        case 'UPDATE_ALERT':
            return { ...state, alert: action.payload }
        // case 'UPDATE_PROFILE':
        //     return { ...state, profile: action.payload }
        case 'UPDATE_PROFILE':
            return {
                ...state,
                profile: action.payload, // Update profile
                currentUser: {           // Update currentUser with the new data
                    ...state.currentUser,
                    name: action.payload.name, // Update name
                    photoURL: action.payload.photoURL, // Update photo if changed
                },
            }
        case 'START_LOADING':
            return { ...state, loading: true }
        case 'END_LOADING':
            return { ...state, loading: false }
        default:
            throw new Error('No matched action!');
    }
};

export default reducer;