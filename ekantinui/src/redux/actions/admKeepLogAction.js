import Axios from "axios";
import { APIURL } from "./../../helpers/APIURL";
import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_UNSUCCESS,
    ADMIN_LOGIN_LOADING
} from "./../types"

export const adminKeepLogin = () => {
    // Get Token
    const token = localStorage.getItem("e-kantin_admin")
    return dispatch => {
        dispatch({ type: ADMIN_LOGIN_LOADING })
        let options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        Axios.post(`${APIURL}/admin/keep-login`,null,options)
        .then((res) => {
            // console.log('keep login data', res.data)
            dispatch ({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.result })
        }).catch(() => {
            dispatch ({ type: ADMIN_LOGIN_UNSUCCESS, payload: 'Server error!' })
        })
    }
}