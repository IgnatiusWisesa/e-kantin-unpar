import {
  LOGIN_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_UNSUCCESS,
  ADMIN_LOGIN_LOADING
} from "../types";

const INITIAL_STATE = {
  adminId: "",
  adminMail: "",
  adminRole: '',
  loading: false,
  login: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
switch (type) {
  case LOGIN_SUCCESS:
      return { 
        ...INITIAL_STATE,
        adminId: payload.adminId,
        adminMail: payload.adminMail,
        adminRole: payload.adminRole,
        loading: false,
        login: true 
       };
  case ADMIN_LOGIN_SUCCESS:
    // console.log('keep login')
    return {
      ...INITIAL_STATE,
      adminId: payload.adminId,
      adminMail: payload.adminMail,
      adminRole: payload.adminRole,
      loading: false,
      login: true 
    };
  case ADMIN_LOGIN_UNSUCCESS:
      return state;
  case ADMIN_LOGIN_LOADING:
      return ({ ...INITIAL_STATE, loading: true })
  default:
    return state;
}
};