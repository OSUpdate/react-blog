import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";
import * as api from "../lib/api";

const INIT = "develop/INIT";

const ERASE = "develop/ERASE";
const UPDATE = "develop/UPDATE";
const INSERT = "develop/INSERT";

const NEW_BOARD = "develop/NEW_BOARD";
const UPDATE_BOARD = "develop/UPDATE_BOARD";
const DELETE_BOARD = "develop/DELETE_BOARD";

const CLOSE_MESSAGE = "account/CLOSE_MESSAGE";

export const init = createAction(INIT, api.init);

export const erase = createAction(ERASE, api.erase);
export const update = createAction(UPDATE, api.update);
export const insert = createAction(INSERT, api.insert);

export const newBoard = createAction(NEW_BOARD,api.newBoard);
export const updateBoard = createAction(UPDATE_BOARD,api.updateBoard);
export const deleteBoard = createAction(DELETE_BOARD,api.deleteBoard);

export const closeMessage = createAction(CLOSE_MESSAGE);

const initialState = Map({
    message:Map({
        title: "",
        content: "",
        modal: false
    }),
    //메뉴창 게시판 리스트
    board:List(),
    current:List(),
    //현재 게시판 페이징 처리 변수
    page:1,
    first:1,
    end:10
});
const reducer = handleActions({
    [CLOSE_MESSAGE]: (state, action) => {
        return state
            .setIn(["message", "title"],"")
            .setIn(["message", "content"],"")
            .setIn(["message", "modal"], false);
    },
},initialState);
export default applyPenders(reducer,[
    {
        // 서버에 초기화 요청
        type: INIT,
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
        type: ERASE,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;
            return state
                .setIn(["message", "title"],"")
                .setIn(["message", "content"],"")
                .setIn(["message", "modal"], true);
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
            return state
                .setIn(["message", "title"],"")
                .setIn(["message", "content"],"")
                .setIn(["message", "modal"], true);
        }
    },
    {
        // 서버에 초기화 요청
        type: UPDATE,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;  
            return state
                .setIn(["message", "title"],"")
                .setIn(["message", "content"],"")
                .setIn(["message", "modal"], true);
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
            return state
                .setIn(["message", "title"],"")
                .setIn(["message", "content"],"")
                .setIn(["message", "modal"], true);
        }
    },
    {
        // 서버에 초기화 요청
        type: INSERT,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload; 
            return state
                .setIn(["message", "title"],"")
                .setIn(["message", "content"],"")
                .setIn(["message", "modal"], true);
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
            return state
                .setIn(["message", "title"],"")
                .setIn(["message", "content"],"")
                .setIn(["message", "modal"], true);
        }
    },
]);