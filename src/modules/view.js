import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";
import * as api from "../lib/api";

const LOADING = "view/LOADING";

const INIT = "view/INIT";

const SEARCH = "view/SEARCH";
const NEXT_BOARD = "view/NEXT_BOARD";
const PREV_BOARD = "view/PREV_BOARD";

export const loading = createAction(LOADING);

export const init = createAction(INIT, api.init);

export const search = createAction(SEARCH,);
export const nextBoard = createAction(NEXT_BOARD,);
export const prevBoard = createAction(PREV_BOARD,);

const initialState = Map({
    //메뉴창 게시판 리스트
    board:List(),
    //현재 게시판 정보
    current:List(),
    //현재 게시판 페이징 처리 변수
    page:1,
    first:1,
    end:10
});
const reducer = handleActions({
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
        type: SEARCH,
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
        type: NEXT_BOARD,
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
        type: PREV_BOARD,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;  
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
        }
    }
]);