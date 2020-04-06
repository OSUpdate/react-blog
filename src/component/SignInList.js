import React from "react";
import SignIn from "./SignIn";
import {Link} from "react-router-dom";
import { List, Map } from "immutable";
/* input 컴포넌트 리스트 */
const SignInList = ({signIn, onClick, onChange}) => {
    const SignInList = signIn.map(
        (item, index) => {
            // 데이터 추출
            const { num, id, value, type, title} = item.toJS();
            return(
                <SignIn
                    num={num}
                    key={index}
                    id={id}
                    type={type}
                    title={title}
                    value={value}
                    onChange={onChange}
                />
            );
        }
    );
    return (
        <React.Fragment>
            {SignInList}
            <input type="submit" value="로그인" onClick={onClick}/>
            <a href="/register"><p>회원가입</p></a>
        </React.Fragment>
    );

};
SignInList.defaultProps = {
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