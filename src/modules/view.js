import { List, Map, fromJS} from "immutable";
import { handleActions, createAction} from "redux-actions";
import { pender, applyPenders} from "redux-pender";

const LOADING = "view/LOADING";

export const loading = createAction(LOADING);

const initialState = Map({
});
const reducer = handleActions({
},initialState);
export default applyPenders(reducer,[
    {
        // 서버에 초기화 요청
        type: LOADING,
        // 통신이 성공일 경우 싱행 함수
        onSuccess: (state, action) => {
            const {data: post} = action.payload;
            const response = post.Response.response;
            const over = response.continue;
            /*
            const source = response.src;
            const templates = fromJS(response.templates);
            const filename = response.name;
            */
            const recommend = response.recommend;
            const all = response.data;
            const numb = response.numb;
            
            const result = response.result;
            const user = response.user;
            console.log(recommend);
            // 이전에 작업한 내역이 있을 경우
            if(over){
                return state.setIn(["continue", "modal"], true)
                    .setIn(["continue", "title"],"Continue")
                    .setIn(["continue", "content"],"이전에 중단된 작업을 계속 하시겠습니까?");
            }
           
            if(result){
                return state.set("view",all)
                    .set("recommend", recommend)
                    .set("user",user)
                    .set("loading",false)
                    .set("chart", numb);
            }
            
        },
        // 에러가 발생한 경우 실행 함수
        onError: (state, action) => {
            const {data: post, status: status} = action.payload.response;
            // 값에 이상이 있는 경우 에러 처리
            if(status === 401 && !post.Response.response.result){
                // 에러 메시지 모달 open
                return state.setIn(["message", "modal"], true)
                    .setIn(["message", "title"],"Error")
                    .setIn(["message", "content"],"로그인이 필요한 서비스입니다.");
            }
            // 통신에 문제 발생시 에러 처리
            else{
                // 에러 메시지 모달 open
                return state.setIn(["message", "modal"], true)
                    .setIn(["message", "title"],"Error")
                    .setIn(["message", "content"],"서버와 연결에 문제가 발생했습니다.");
            }

        }
    }
]);