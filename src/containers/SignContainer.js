import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as accountActions from "../modules/account";
import SignInList from "../component/SignInList";
import SignUpList from "../component/SignUpList";
import styles from "../App.css";
import { List, Map, fromJS} from "immutable";
import _ from  "partial-js";

class SignContainer extends Component {
    constructor(props){
        super(props);
        const { location } = props;
        this.path = location.pathname === "/register"?true:false;
        
        this.state = {
            signUp:List([
                Map({
                    num:0,
                    id:"id",
                    type: "text",
                    title:"아이디",
                    value:"",
                    error:"영문, 숫자 조합으로 6자 이상 입력해주세요",
                    check:false
                }),
                Map({
                    num:1,
                    id:"password",
                    type: "password",
                    title:"비밀번호",
                    value:"",
                    error:"영문, 숫자 조합으로 8자 이상 입력해주세요",
                    check:false
                }),
                Map({
                    num:2,
                    id:"check",
                    type: "password",
                    title:"비밀번호 확인",
                    value:"",
                    error:"비밀번호가 다릅니다",
                    check:false
                }),
                Map({
                    num:3,
                    id:"email",
                    type: "email",
                    title:"이메일",
                    value:"",
                    error:"이메일 형식에 맞춰 입력해주세요",
                    check:false
                })
            ]),
            // 로그인 데이터
            signIn:List([
                Map({
                    num:0,
                    id:"id",
                    type: "text",
                    title:"아이디",
                    value:"",
                }),
                Map({
                    num:1,
                    id:"password",
                    type: "password",
                    title:"비밀번호",
                    value:"",
                })
            ]),
        };
    }
    handleSignUpInput = (e, num) => {
        this.setState({
            signUp:this.state.signUp.setIn([num,"value"],e.target.value)
        });
    }
    handleExpChange = (bool, value, num) => {
        const { signUp } = this.state;
        bool?
            _.isEmpty(value)?this.setState({
                signUp:signUp.setIn([num,"check"], false)
            })
                :this.setState({
                    signUp:signUp.setIn([num,"check"], true)
                }):
            this.setState({
                signUp:signUp.setIn([num,"check"], false)
            });
    }
    /* 회원가입 입력시 입력값 검증 onKeyUp 함수 */
    handleSignUpChange = (e, num) => {
        const {signUp} = this.state;
        const exps = [
            !(/^(?=.*[a-zA-Z])(?=.*\d).{6,10}$/.test(signUp.getIn([0,"value"]))),
            !(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/.test(signUp.getIn([1,"value"]))),
            signUp.getIn([1,"value"]) !== signUp.getIn([2,"value"]),
            !(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(signUp.getIn([3,"value"])))
        ];
        console.log(exps);
        this.handleExpChange(exps[num],e.target.value,num);

    }
    /* 회원가입 버튼 onClick 함수 */
    handleSignUpClick = async () => {
    }
    handleSignInChange = (e, num) => {
       
    }
    render(){
        const {signIn, signUp} = this.state;
        const {
            handleSignInChange,
            handleSignUpClick,
            handleSignUpChange,
            handleSignUpInput
        } = this;
        console.log(this.props.location);
        return(
            <section className={styles.full}>
                <div className={styles.sign}>
                    {this.path?
                        <SignUpList
                            signUp={signUp}
                            onClick={handleSignUpClick}
                            onChange={handleSignUpInput}
                            onKeyUp={handleSignUpChange}
                        />:
                        <SignInList
                            signIn={signIn}
                            onChange={handleSignInChange}
                        />
                    }
                </div>
            </section>
        );
    }
}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })  
)(withRouter(SignContainer));