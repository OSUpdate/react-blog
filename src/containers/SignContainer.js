import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {signin, signup} from "../lib/api";
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
    handleSignUpSubmit = (e) => {
        const {signUp} = this.state;
        e.preventDefault();
        const id = signUp.getIn([0,"value"]);
        const pw = signUp.getIn([1,"value"]);
        const check = signUp.getIn([2,"value"]);
        const email = signUp.getIn([3,"value"]);
        
        _.go(
            _.every([0,1,2,3],item=>
                !signUp.getIn([item,"check"])
            ),
            checked => checked?signup(id,pw,check,email):_.stop(),
            (response) => {
                console.log(response);
                return response;
            },
            _.catch()
        );
    }
    handleSignInChange = (e, num) => {
        this.setState({
            signIn:this.state.signIn.setIn([num,"value"],e.target.value)
        });
    }
    handleSignInSubmit = (e) => {
        e.preventDefault();
        const id = this.state.signIn.getIn([0,"value"]);
        const pw = this.state.signIn.getIn([1,"value"]);
        _.go(
            signin(id,pw),
            item => {console.log(item,"then");
                return item;},
            _.catch(res => console.log(res,"catch"))
        );
    }
    render(){
        const {signIn, signUp} = this.state;
        const {
            handleSignInSubmit,
            handleSignInChange,
            handleSignUpSubmit,
            handleSignUpChange,
            handleSignUpInput
        } = this;
        return(
            <section className={styles.full}>
                <div className={styles.sign}>
                    {this.path?
                        <SignUpList
                            signUp={signUp}
                            onClick={handleSignUpSubmit}
                            onChange={handleSignUpInput}
                            onKeyUp={handleSignUpChange}
                        />:
                        <SignInList
                            signIn={signIn}
                            onClick={handleSignInSubmit}
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