import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    isUserCreated: false
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
        default:
            return state;
    }
}

export default adminReducer;