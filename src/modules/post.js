import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";
import * as api from "../lib/api";
import _ from "partial-js";

const GET_POST = "post/GET";
const NEW_POST = "post/NEW_BOARD";
const UPDATE_POST = "post/UPDATE_BOARD";
const DELETE_POST = "post/DELETE_POST";
const GET_BOARD_POST = "post/GET_POST";
const GET_ALL_POST = "post/GET_ALL_POST";

const CHECK_POST = "post/CHECK_POST";
const ALL_CHECK_TOGGLE = "post/ALL_CHECK_TOGGLE";
const CHANGE_LIST = "post/CHANGE_LIST";

export const getPost = createAction(GET_POST, api.getReadPost);
export const insertPost = createAction(NEW_POST,api.insertPost);
export const updatePost = createAction(UPDATE_POST,api.updatePost);
export const deletePost = createAction(DELETE_POST,api.deletePost);
export const getPosts = createAction(GET_BOARD_POST, api.getBoardPost);
export const getAllPost = createAction(GET_ALL_POST,api.getAllPost);

export const changeList = createAction(CHANGE_LIST, list => list);
export const checkPost = createAction(CHECK_POST, value=>value);
export const allCheckToggle = createAction(ALL_CHECK_TOGGLE);

const initialState = Map({
    //메뉴창 게시판 리스트
    post:List(),
    total:0,
    //현재 게시판 페이징 처리 변수
    current:1,
    start:1,
    end:10,

});
const reducer = handleActions({
    [CHANGE_LIST]:(state, {payload: data}) => {
        return state.set("post",fromJS(data));
    },
    [CHECK_POST]: (state, {payload: data}) => {
        const arr = state.get("post").toJS();
        
        return state.set("post",List(_.map(arr, item => {
            item.title === data? item.checked = !item.checked:null;
            return Map(item);
        })));
    },
    [ALL_CHECK_TOGGLE]: (state, {payload: data}) => {
        const arr = state.get("post").toJS();
        const checked = _.every(arr,item=>item.checked === false);
        return state.set("post",checked?
            List(_.map(arr,item=>{
                item.checked=true;
                return Map(item);
            })):
            _.every(arr,item => item.checked === true)?
                List(_.map(arr,item=>{
                    item.checked=false;
                    return Map(item);
                })):
                List(_.map(arr,item=>{
                    item.checked=true;
                    return Map(item);
                }))
        );
    },
    /*
    [CLOSE_MESSAGE]: (state, action) => {
        return state
            .setIn(["message", "title"],"")
            .setIn(["message", "content"],"")
            .setIn(["message", "modal"], false);
    },
    [MENU_TOGGLE]: (state, {payload: menu}) => {
        const closeMenu = state.get("menuBtn").findKey((item)=>item == true);
        if(menu != closeMenu)
            return state
                .updateIn(["menuBtn", closeMenu], (item)=>!item)
                .updateIn(["menuBtn", menu], item => !item);
        return state.updateIn(["menuBtn", menu], item => !item);

    }
    */
},initialState);
export default applyPenders(reducer,[
    {
        // 서버에 초기화 요청
        type: GET_POST,
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
        type: GET_ALL_POST,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;
            console.log(res);
            const arr = res.response.result?List(_.map(res.response.data.post,(item,index)=>{
                console.log(item,"item");
                return Map({
                    ...item,
                    checked:false
                });
            })):List();
            return state.set("post",arr).set("total",res.response.data.total);
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: res, status: status} = action.payload.response;
        }
    },
    {
        // 서버에 초기화 요청
        type: NEW_POST,
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
        type: GET_BOARD_POST,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: res} = action.payload;
            const arr = res.response.result?List(_.map(res.response.data.post,(item,index)=>{
                return Map({
                    ...item,
                    checked:false
                });
            })):List();
            return state.set("post",arr).set("total",res.response.data.total);
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
        type: UPDATE_POST,
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
        type: DELETE_POST,
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