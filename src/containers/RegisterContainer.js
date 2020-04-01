import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import * as accountActions from "../modules/account";
import SignUpList from "../component/SignUpList";
import styles from "../App.css";

class RegisterContainer extends Component {
    /* 회원가입 입력시 상태 업데이트 onChange 함수 */
    handleSignUpInput = (e) => {
        const {AccountActions} = this.props;
        switch(e.target.name){
        // 이벤트가 발생한 input 태그가 id인 경우
        case "id":
            AccountActions.inputId(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 password인 경우
        case "password":
            AccountActions.inputPassword(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 check인 경우
        case "check":
            AccountActions.inputCheck(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 email인 경우
        case "email":
            AccountActions.inputEmail(e.target.value);
            break;
        }
    }
    /* 회원가입 입력시 입력값 검증 onKeyUp 함수 */
    handleSignUpChange = (e) => {
        const {AccountActions} = this.props;
        switch(e.target.name){
        // 이벤트가 발생한 input 태그가 id인 경우
        case "id":
            AccountActions.changeId(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 password인 경우
        case "password":
            AccountActions.changePassword(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 check인 경우
        case "check":
            AccountActions.changeCheck(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 email인 경우
        case "email":
            AccountActions.changeEmail(e.target.value);
            break;
        }
    }
    /* 회원가입 버튼 onClick 함수 */
    handleSignUpClick = async () => {
        const {AccountActions, signUp} = this.props;
        // input 태그 데이터에 문제 있는 항목 가져옴
        const checkedList = signUp.filter(
            (item)=>{
                return item.get("checked") === true;
            }
        );
        // input 태그가 비어있는 항목 가져옴
        const valueList = signUp.filter(
            (item)=>{
                return item.get("value") === "";
            }
        );
        // 문제가 있을 경우 전송 안함
        if((checkedList.size > 0)|| valueList.size > 0)
            return;
        
        try{
            // 서버에 회원가입 요청
            await AccountActions.signUp(
                signUp.getIn([0,"value"]),
                signUp.getIn([1,"value"]),
                signUp.getIn([2,"value"]),
                signUp.getIn([3,"value"])
            );
        }
        // 회원가입 중 에러 발생시 처리
        catch(e){
            // 회원가입 에러 처리 함수 호출
            this.handleSignUpFail();
        }
    }
    render(){
        const {signUp} = this.props;
        const {handleSignUpInput, handleSignUpChange, handleSignUpClick} = this;
        return(
            <section className={styles.full}>
                <div className={styles.sign}>
                    <SignUpList
                        signUp={signUp}
                        onClick={handleSignUpClick}
                        onChange={handleSignUpInput}
                        onKeyUp={handleSignUpChange}
                    />
                </div>
            </section>
        );
    }
}

export default connect(
    (state) => ({
        
        signUp: state.account.get("signUp"),
        
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })  
)(RegisterContainer);