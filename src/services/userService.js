import axios from '../axios';
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)

}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`)
}
const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllcodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHome = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`)
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctors`)
}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllcodeService,
    getTopDoctorHome, getAllDoctor
}