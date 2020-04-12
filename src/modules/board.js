import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";
import * as api from "../lib/api";
import _ from  "partial-js";

const GET_BOARD = "board/GET";

const NEW_BOARD = "board/NEW_BOARD";
const UPDATE_BOARD = "board/UPDATE_BOARD";
const DELETE_BOARD = "board/DELETE_BOARD";

const UPDATE_TITLE = "board/UPDATE_TITLE";

const MODIFY = "board/MODIFY";
const CONFIRM = "board/CONFIRM";

export const getBoard = createAction(GET_BOARD, api.getBoards);
export const insertBoard = createAction(NEW_BOARD,api.insertBoard);
export const updateBoard = createAction(UPDATE_BOARD,api.updateBoard);
export const deleteBoard = createAction(DELETE_BOARD,api.deleteBoard);

export const updateTitle = createAction(UPDATE_TITLE, (num,title)=>{
    return {num:num,title:title};
});

export const modify = createAction(MODIFY, num => num);
export const confirm = createAction(CONFIRM, num => num);

const initialState = Map({
    //메뉴창 게시판 리스트
    board:List(),

});
const reducer = handleActions({
    [UPDATE_TITLE]: (state, {payload: data}) => {
        return state.setIn(["board",data.num,"title"],data.title);
    },
    [MODIFY]: (state, {payload: num}) => {
        return state.updateIn(["board", num, "update"], update=>!update);
    },
    [CONFIRM]: (state, {payload: num}) => {
        return state.updateIn(["board", num, "update"],update=>!update).updateIn(["board",num,"new"],false);

    }
},initialState);
export default applyPenders(reducer,[
    {
        // 서버에 초기화 요청
        type: GET_BOARD,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload; 
            const arr = res.response.result?List(_.map(res.response.data,(item,index) => {
                const {title, orderNo, update, num} = item; 
                return Map({
                    num,
                    orderNo,
                    title,
                    update,
                    new:item.new
                });
            })):List();
            return state.set("board",arr);
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
        }
    },
    {
        // 서버에 초기화 요청
        type: NEW_BOARD,
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
        type: UPDATE_BOARD,
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
        type: DELETE_BOARD,
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