import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import * as accountActions from "../modules/account";
import SignInList from "../component/SignInList";
import styles from "../App.css";

class LoginContainer extends Component {
    render(){
        const {signIn} = this.props;
        console.log(signIn);
        return(
            <section className={styles.full}>
                <SignInList
                    signIn={signIn}
                />
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