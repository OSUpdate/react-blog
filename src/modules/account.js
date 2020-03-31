import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";
import * as api from "../lib/api";

const SIGNUP = "account/SIGNUP";
const SIGNIN = "account/SIGNIN";
const CHECK_LOGIN = "account/CHECK_LOGIN";
const TEMP_LOGIN = "account/TEMP_LOGIN";
const LOGOUT = "account/LOGOUT";

// 로그인 input onChange 이벤트
const CHANGE_LOGIN_ID = "sign/LOGIN_ID";
const CHANGE_LOGIN_PASSWORD = "sign/LOGIN_PASSWORD";

// 회원가입 input onChange 이벤트
const INPUT_ID = "sign/INPUT_ID";
const INPUT_PASSWORD = "sign/INPUT_PASSWORD";
const INPUT_CHECK = "sign/INPUT_CHECK";
const INPUT_EMAIL = "sign/INPUT_EMAIL";

// 회원가입 input onKeyUp 이벤트
const CHANGE_ID= "sign/CHANGE_ID";
const CHANGE_PASSWORD = "sign/CHANGE_PASSWORD";
const CHANGE_CHECK = "sign/CHANGE_CHECK";
const CHANGE_EMAIL = "sign/CHANGE_EMAIL";

const CLEAR = "account/CLEAR";

export const signUp = createAction(SIGNUP, api.signUp);
export const signIn = createAction(SIGNIN, api.signIn);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const tempLogin = createAction(TEMP_LOGIN);
export const logout = createAction(LOGOUT, api.logout);

// 로그인 input onChange 이벤트 함수
export const changeLoginId = createAction(CHANGE_LOGIN_ID);
export const changeLoginPassword = createAction(CHANGE_LOGIN_PASSWORD);

// 회원가입 input onChange 이벤트 함수
export const inputId = createAction(INPUT_ID);
export const inputPassword = createAction(INPUT_PASSWORD);
export const inputCheck = createAction(INPUT_CHECK);
export const inputEmail = createAction(INPUT_EMAIL);

// 회원가입 Input onKeyUp 이벤트 함수
export const changeId = createAction(CHANGE_ID);
export const changePassword = createAction(CHANGE_PASSWORD);
export const changeCheck = createAction(CHANGE_CHECK);
export const changeEmail = createAction(CHANGE_EMAIL);

export const clear = createAction(CLEAR);

const initialState = Map({
    // 회원가입 데이터
    signUp:List([
        Map({
            id:"id",
            type: "text",
            title:"아이디",
            value:"",
            error:"",
            check:false
        }),
        Map({
            id:"password",
            type: "password",
            title:"비밀번호",
            value:"",
            error:"",
            check:false
        }),
        Map({
            id:"check",
            type: "password",
            title:"비밀번호 확인",
            value:"",
            error:"",
            check:false
        }),
        Map({
            id:"email",
            type: "email",
            title:"이메일",
            value:"",
            error:"",
            check:false
        })
    ]),
    // 로그인 데이터
    signIn:List([
        Map({
            id:"id",
            type: "text",
            title:"아이디",
            value:"",
        }),
        Map({
            id:"password",
            type: "password",
            title:"비밀번호",
            value:"",
        })
    ]),
    // 메시지 모달 데이터
    message:Map({
        title: "",
        content: "",
        modal: false
    }),
    // 로그인, 회원가입 모달 데이터
    toggle:false,
    // 로그인, 회원가입 모달 open 여부
    modalIsOpen:false,
    // 로그인 여부
    logged: false,
    // 로그인 아이디
    loginId:"",
    // 로그인 토큰
    token:""
});

const reducer = handleActions({
    // input 초기화 함수
    [CLEAR]: (state, action) => {
        const { payload: value } = action;
        // input 데이터 초기화
        return state.setIn(["signUp",0,"checked"], false)
            .setIn(["signUp",1,"checked"], false)
            .setIn(["signUp",2,"checked"], false)
            .setIn(["signUp",3,"checked"], false)
            .setIn(["signUp",0,"error"], "")
            .setIn(["signUp",1,"error"], "")
            .setIn(["signUp",2,"error"], "")
            .setIn(["signUp",3,"error"], "")
            .setIn(["signUp",0,"value"], "")
            .setIn(["signUp",1,"value"], "")
            .setIn(["signUp",2,"value"], "")
            .setIn(["signUp",3,"value"], "");
    },
    // 에러 메시지 모달 open 함수
    [ERROR]: (state, action) => {
        const { payload: value } = action;
        return state.setIn(["message", "modal"], true)
            .setIn(["message", "title"],"Error")
            .setIn(["message", "content"],value);
    },