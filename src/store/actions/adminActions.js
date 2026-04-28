import actionTypes from './actionTypes';
import {
    createNewUserService, getAllcodeService,
    getAllUsers, deleteUserService,
    editUserService, getTopDoctorHome
} from '../../services/userService';
import { set } from 'lodash';
import { toast } from "react-toastify";
import { CommonUtils } from '../../utils';

export const fetchGenderStart = () => async (dispatch, getState) => {
    try {

        dispatch({ type: actionTypes.FETCH_GENDER_START });

        let res = await getAllcodeService('gender');

        if (res && res.errorCode === 0) {
            dispatch(fetchGenderSuccess(res.data));
        } else {
            dispatch(fetchGenderFails());
        }

    } catch (error) {
        dispatch(fetchGenderFails());
        console.log(error);
    }
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFails = () => ({
    type: actionTypes.FETCH_GENDER_FAILS
})



export const fetchPositionStart = () => async (dispatch, getState) => {
    try {

        dispatch({ type: actionTypes.FETCH_POSITION_START });

        let res = await getAllcodeService('position');

        if (res && res.errorCode === 0) {
            dispatch(fetchPositionSuccess(res.data));
        } else {
            dispatch(fetchPositionFails());
        }

    } catch (error) {
        dispatch(fetchPositionFails());
        console.log(error);
    }
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFails = () => ({
    type: actionTypes.FETCH_POSITION_FAILS
})


export const fetchRoleStart = () => async (dispatch, getState) => {
    try {

        dispatch({ type: actionTypes.FETCH_ROLE_START });

        let res = await getAllcodeService('role');

        if (res && res.errorCode === 0) {
            dispatch(fetchRoleSuccess(res.data));
        } else {
            dispatch(fetchRoleFails());
        }

    } catch (error) {
        dispatch(fetchRoleFails());
        console.log(error);
    }
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFails = () => ({
    type: actionTypes.FETCH_ROLE_FAILS
})


export const saveCreateUser = (data) => async (dispatch, getState) => {
    try {
        let res = await createNewUserService(data);

        console.log("CREATE USER RESPONSE:", res);
        if (res && res.errorCode === 0) {
            dispatch(saveUserSuccess());
            dispatch(fetchAllUsersStart());
        } else {
            dispatch(saveUserFails());
        }

    } catch (error) {
        dispatch(saveUserFails());
        console.log(error);
    }
};
export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})
export const saveUserFails = () => ({
    type: actionTypes.SAVE_USER_FAILS
})
// export const saveUserExist = () => ({
//     type: actionTypes.SAVE_USER_EXIST
// })


export const fetchAllUsersStart = () => async (dispatch, getState) => {
    try {
        let res = await getAllUsers('ALL');
        if (res && res.errorCode === 0) {
            let users = res.users.reverse();
            dispatch(fetchAllUsersSuccess(users));
        } else {
            dispatch(fetchAllUsersFails());
        }

    } catch (error) {
        dispatch(fetchAllUsersFails());
        console.log(error);
    }
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFails = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILS
})
export const resetCreateUser = () => ({
    type: actionTypes.RESET_CREATE_USER
});


export const deleteAUser = (userId) => async (dispatch, getState) => {
    try {
        let res = await deleteUserService(userId);

        if (res && res.errorCode === 0) {
            // toast.success("Delete user succeed!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllUsersStart());
        } else {
            // toast.error("Delete user fails!");
            dispatch(deleteUserFails());
        }

    } catch (error) {
        dispatch(deleteUserFails());
        console.log(error);
    }
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFails = () => ({
    type: actionTypes.DELETE_USER_FAILS
})
export const resetDeleteUser = () => ({
    type: actionTypes.RESET_DELETE_USER
});



export const editAUser = (data) => async (dispatch, getState) => {
    try {
        let res = await editUserService(data);

        if (res && res.errorCode === 0) {

            dispatch(editUserSuccess());
            await dispatch(fetchAllUsersStart());
            await dispatch(fetchTopDoctorHome());
        } else {

            dispatch(editUserFails());
        }

    } catch (error) {
        dispatch(editUserFails());
        console.log(error);
    }
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFails = () => ({
    type: actionTypes.EDIT_USER_FAILS
})

export const resetEditUser = () => ({
    type: actionTypes.RESET_EDIT_USER
});

export const fetchTopDoctorHome = (limit) => async (dispatch, getState) => {
    try {
        let resDoctor = await getTopDoctorHome('10');
        if (resDoctor && resDoctor.errorCode === 0) {
            let data = resDoctor.data;
            if (data && data.length > 0) {
                data = data.map(item => {
                    if (item.image && item.image.data) {
                        // Convert buffer sang base64
                        item.image = CommonUtils.getBase64FromBuffer(item.image.data);
                    }
                    return item;
                });
            }

            dispatch(fetchTopDoctorSuccess(data));
        } else {
            dispatch(fetchTopDoctorFails());
        }
    } catch (error) {
        dispatch(fetchTopDoctorFails());
        console.log('fetch top doctor fails', error);
    }
};

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data
})
export const fetchTopDoctorFails = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILS
})