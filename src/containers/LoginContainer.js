import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import * as accountActions from "../modules/account";
import SignInList from "../component/SignInList";
import styles from "../App.css";

class LoginContainer extends Component {
    handleSignInChange = (e) => {
        const {AccountActions} = this.props;
        switch(e.target.name){
        // 이벤트가 발생한 input 태그가 id인 경우
        case "id":
            AccountActions.changeLoginId(e.target.value);
            break;
        // 이벤트가 발생한 input 태그가 password인 경우
        case "password":
            AccountActions.changeLoginPassword(e.target.value);
            break;
        }
    }
    render(){
        const {signIn} = this.props;
        const {handleSignInChange} = this;
        console.log(signIn);
        return(
            <section className={styles.full}>
                <div className={styles.sign}>
                    <SignInList
                        signIn={signIn}
                        onChange={handleSignInChange}
                    />
                </div>
            </section>
        );
    }
}

export default connect(
    (state) => ({
        
        signIn: state.account.get("signIn"),
        token: state.account.get("token")
        
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })  
)(LoginContainer);