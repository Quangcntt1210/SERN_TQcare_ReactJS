import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    isUserCreated: false,
    deleteStatus: 'idle' | 'success' | 'fail',
    isUserUpdated: 'idle' | 'success' | 'fail',
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false
            }

        case actionTypes.FETCH_GENDER_FAILS:
            return {
                ...state,
                genders: [],
                isLoadingGender: false
            }

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
                isLoadingPosition: false
            }

        case actionTypes.FETCH_POSITION_FAILS:
            return {
                ...state,
                positions: [],
                isLoadingPosition: false
            }

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
                isLoadingRole: false
            }

        case actionTypes.FETCH_ROLE_FAILS:
            return {
                ...state,
                roles: [],
                isLoadingRole: false
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            };

        case actionTypes.FETCH_ALL_USERS_FAILS:
            return {
                ...state,
                users: []
            };
        case actionTypes.SAVE_USER_SUCCESS:
            return {
                ...state,
                isUserCreated: true
            };

        case actionTypes.SAVE_USER_FAILS:
            return {
                ...state,
                isUserCreated: false
            };

        case actionTypes.RESET_CREATE_USER:
            return {
                ...state,
                isUserCreated: false
            };
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                deleteStatus: 'success'
            };
        case actionTypes.DELETE_USER_FAILS:
            return {
                ...state,
                deleteStatus: 'fail'
            };
        case actionTypes.RESET_DELETE_USER:
            return {
                ...state,
                deleteStatus: 'idle'
            };
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                isUserUpdated: 'success'
            };
        case actionTypes.EDIT_USER_FAILS:
            return {
                ...state,
                isUserUpdated: 'fail'
            };
        case actionTypes.RESET_EDIT_USER:
            return {
                ...state,
                isUserUpdated: 'idle'
            };
        default:
            return state;
    }
}

export default adminReducer;