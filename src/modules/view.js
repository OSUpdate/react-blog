import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";
import * as api from "../lib/api";

const LOADING = "view/LOADING";

const INIT = "view/INIT";

const SEARCH = "view/SEARCH";
const NEXT_BOARD = "view/NEXT_BOARD";
const PREV_BOARD = "view/PREV_BOARD";

const MENU_TOGGLE = "view/MENU_TOGGLE";

export const loading = createAction(LOADING);

export const init = createAction(INIT, api.init);

export const search = createAction(SEARCH, api.search);
export const nextBoard = createAction(NEXT_BOARD,);
export const prevBoard = createAction(PREV_BOARD,);

export const menuToggle = createAction(MENU_TOGGLE);

const initialState = Map({
    //메뉴창 게시판 리스트
    board:List(),
    //현재 게시판 정보
    current:
    Map({
        title:"게시판",
        list:List([
            Map({
                num:1,
                time:"2020-03-31 15:00",
                title:"게시글1",
                content:"내용"
            }),
            Map({
                num:2,
                time:"2020-03-31 16:00",
                title:"게시글2",
                content:"내용"
            }),
            Map({
                num:3,
                time:"2020-03-31 17:00",
                title:"게시글3",
                content:"내용"
            }),
            Map({
                num:4,
                time:"2020-03-31 18:00",
                title:"게시글4",
                content:"내용"
            }),
            Map({
                num:5,
                time:"2020-03-31 18:10",
                title:"게시글5",
                content:"내용"
            }),
            Map({
                num:6,
                time:"2020-03-31 18:20",
                title:"게시글6",
                content:"내용"
            }),
            Map({
                num:7,
                time:"2020-03-31 18:30",
                title:"게시글7",
                content:"내용"
            }),
            Map({
                num:8,
                time:"2020-03-31 18:40",
                title:"게시글8",
                content:"내용"
            }),
            Map({
                num:9,
                time:"2020-03-31 18:50",
                title:"게시글9",
                content:"내용"
            }),
            Map({
                num:10,
                time:"2020-03-31 19:00",
                title:"게시글10",
                content:"내용"
            }),
        ])
    }),
    //현재 게시판 페이징 처리 변수
    page:1,
    first:1,
    end:10
});
const reducer = handleActions({
    [MENU_TOGGLE]: (state, action) => {
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