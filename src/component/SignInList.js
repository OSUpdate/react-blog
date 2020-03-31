import React from "react";
import SignIn from "./SignIn";
import {Link} from "react-router-dom";
import { List, Map } from "immutable";
/* input 컴포넌트 리스트 */
const SignInList = ({signIn}) => {
    const SignInList = signIn.map(
        (item, index) => {
            // 데이터 추출
            console.log(item);
            const { id, value, type, title} = item.toJS();
            return(
                <SignIn
                    key={index}
                    id={id}
                    type={type}
                    title={title}
                    value={value}
                />
            );
        }
    );
    return (
        <React.Fragment>
            {SignInList}
            <input type="submit" value="로그인"/>
            <Link to="/find"><p>아이디‧비밀번호 찾기</p></Link>
        </React.Fragment>
    );

};
SignInList.defaultProps = {
    signUp:List([
        Map({
            id:"id",
            type: "text",
            title:"아이디",
            value:"",
            error: "",
            checked: false
        }),
        Map({
            id:"password",
            type: "password",
            title:"비밀번호",
            value:"",
            error:"",
            checked: false,
        }),
        Map({
            id:"check",
            type: "password",
            title:"비밀번호 확인",
            value:"",
            error:"",
            checked: false,
        }),
        Map({
            id:"email",
            type: "email",
            title:"이메일",
            value:"",
            error:"",
            checked: false,
        })
    ]),
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
};

export default SignInList;