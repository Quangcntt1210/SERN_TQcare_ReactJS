import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService';


export const fetchGenderStart = () => async (dispatch, getState) => {
    try {

        dispatch({ type: actionTypes.FETCH_GENDER_START });

        let res = await getAllcodeService('gender');

        if (res && res.errCode === 0) {
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

        if (res && res.errCode === 0) {
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

        if (res && res.errCode === 0) {
            dispatch(fetchRoleSuccess(res.data));
        } else {
            dispatch(fetchRoleFails());
        }

    } catch (error) {
        dispatch(fetchPositionFails());
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


