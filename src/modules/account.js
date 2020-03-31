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
const CHANGE_LOGIN_ID = "account/LOGIN_ID";
const CHANGE_LOGIN_PASSWORD = "account/LOGIN_PASSWORD";

// 회원가입 input onChange 이벤트
const INPUT_ID = "account/INPUT_ID";
const INPUT_PASSWORD = "account/INPUT_PASSWORD";
const INPUT_CHECK = "account/INPUT_CHECK";
const INPUT_EMAIL = "account/INPUT_EMAIL";

// 회원가입 input onKeyUp 이벤트
const CHANGE_ID= "account/CHANGE_ID";
const CHANGE_PASSWORD = "account/CHANGE_PASSWORD";
const CHANGE_CHECK = "account/CHANGE_CHECK";
const CHANGE_EMAIL = "account/CHANGE_EMAIL";

const CLEAR = "account/CLEAR";

export const signUp = createAction(SIGNUP, api.signup);
export const signIn = createAction(SIGNIN, api.signin);
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
    token:""
});

const reducer = handleActions({
    // input 초기화 함수
    [CLEAR]: (state, action) => {
        const { payload: value } = action;
        // input 데이터 초기화
        return state
            .setIn(["signUp",0,"checked"], false)
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
    // 로그인 아이디 onChange 이벤트 함수
    [CHANGE_LOGIN_ID]:(state,action) => {
        const { payload: value } = action;
        return state.setIn(["signIn", 0, "value"],value);
    },
    // 로그인 비밀번호 onChange 이벤트 함수
    [CHANGE_LOGIN_PASSWORD]:(state,action) => {
        const { payload: value } = action;
        return state.setIn(["signIn", 1, "value"],value);
    },
    // 회원가입 아이디 onChange 이벤트 함수
    [INPUT_ID]: (state, action ) =>{
        const { payload: value } = action;
        return state.setIn(["signUp", 0, "value"],value);
    },
    // 회원가입 비밀번호 onChange 이벤트 함수
    [INPUT_PASSWORD]: (state, action ) =>{
        const { payload: value } = action;
        return state.setIn(["signUp", 1, "value"],value);
    },
    // 회원가입 비밀번호 확인 onChange 이밴트 함수
    [INPUT_CHECK]: (state, action ) =>{
        const { payload: value } = action;
        return state.setIn(["signUp", 2, "value"],value);
    },
    // 회원가입 이메일 onChange 이벤트 함수
    [INPUT_EMAIL]: (state, action ) =>{
        const { payload: value } = action;
        return state.setIn(["signUp", 3, "value"],value);
    },
    // 회원가입 아이디 onKeyUp 이벤트 함수
    [CHANGE_ID]: (state, action) => {
        const { payload: value } = action;
        // 정규식으로 아이디 검증
        if(!(/^(?=.*[a-zA-Z])(?=.*\d).{6,10}$/.test(value))){
            // 아이디가 비어있을 경우 에러 메시지 표시안함
            if(value === ""){
                return state.setIn(["signUp", 0, "error"],"")
                    .setIn(["signUp", 0,"checked"],false);
            }
            // 에러 메시지 표시
            const text = "영문, 숫자 조합으로 6자 이상 입력해주세요";
            return state.setIn(["signUp", 0, "error"],text)
                .setIn(["signUp", 0,"checked"],true);
        }
        return state.setIn(["signUp", 0,"error"], "")
            .setIn(["signUp", 0,"checked"],false);
    },
    // 회원가입 비밀번호 onKeyUp 이벤트 함수
    [CHANGE_PASSWORD]: (state, action) => {
        const { payload: value } = action;
        // 비밀번호 확인에만 데이터가 있고 데이터가 동일한 경우 에러 메시지 표시 안함
        if( "" !== state.getIn(["signUp", 2, "value"]) && value === state.getIn(["signUp", 2, "value"])){
            return state.setIn(["signUp", 2,"error"], "")
                .setIn(["signUp", 2,"checked"],false);
        }
        // 비밀번호 확인에 데이터가 있고 비밀번호에 입력한 값이랑 다를 경우 메시지 표시
        else if("" !== state.getIn(["signUp", 2, "value"]) && value !== state.getIn(["signUp", 2, "value"])){
            const text = "비밀번호가 다릅니다";
            return state.setIn(["signUp", 2, "error"],text)
                .setIn(["signUp", 2,"checked"],true);
        }
        else{
            // 정규식으로 비밀번호 검증
            if(!(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value))){
                // 비밀번호가 비어있을 경우 에러 메시지 표시 안함
                if(value === ""){
                    return state.setIn(["signUp", 1, "error"],"")
                        .setIn(["signUp", 1,"checked"],false);
                }
                // 에러 메시지 표시
                const text = "영문, 숫자 조합으로 6자 이상 입력해주세요";
                return state.setIn(["signUp", 1, "error"],text)
                    .setIn(["signUp", 1,"checked"],true);
            }
            // 정규식에 맞는 경우 에러 메시지 표시 안함
            return state.setIn(["signUp", 1,"error"], "")
                .setIn(["signUp", 1,"checked"],false);
        }
        
    },
    // 회원가입 비밀번호 확인 onKeyUp 이벤트 함수
    [CHANGE_CHECK]: (state, action) => {
        const { payload: value } = action;
        // 비밀번호와 값 비교
        if(value !== state.getIn(["signUp", 1, "value"])){
            if(value === ""){
                // 비어있을 경우 메시지 표시 안함
                return state.setIn(["signUp", 2, "error"],"")
                    .setIn(["signUp", 2,"checked"],false);
            }
            // 에러 메시지 표시
            const text = "비밀번호가 다릅니다";
            return state.setIn(["signUp", 2, "error"],text)
                .setIn(["signUp", 2,"checked"],true);
        }
        // 동일한 경우 에러 메시지 표시 안함
        return state.setIn(["signUp", 2,"error"], "")
            .setIn(["signUp", 2,"checked"],false);
    },
    // 회원가입 이메일 onKeyUp 이벤트 함수
    [CHANGE_EMAIL]: (state, action) => {
        const { payload: value } = action;
        // 정규식으로 이메일 검증
        if(!(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(value))){
            // 비어있을 경우 에러 메시지 표시 안함
            if(value === ""){
                return state.setIn(["signUp", 3, "error"],"")
                    .setIn(["signUp", 3,"checked"],false);
            }
            // 에러메시지 표시
            const text = "이메일 형식에 맞춰 입력해주세요";
            return state.setIn(["signUp", 3, "error"],text)
                .setIn(["signUp", 3,"checked"],true);
        }
        // 정규식에 맞는 경우 에러 메시지 표시 안함
        return state.setIn(["signUp", 3,"error"], "")
            .setIn(["signUp", 3,"checked"],false);
    }
}, initialState);
export default applyPenders(reducer,[
    {
        // 서버에 초기화 요청
        type: SIGNIN,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;  
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
        }
    },
    {
        // 서버에 초기화 요청
        type: SIGNUP,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;  
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
        }
    },
]);