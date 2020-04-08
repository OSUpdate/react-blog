import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter, Switch, Route, Link} from "react-router-dom";
import {Line} from "react-chartjs-2";
import {checkLogin, logout} from "../lib/api";
import cx from "classnames";
import * as developActions from "../modules/development";
import styles from "../App.css";
import EditMain from "../component/EditMain";
import EditPost from "../component/EditPost";
import EditRead from "../component/EditRead";
import EditWrite from "../component/EditWrite";
import EditBoard from "../component/EditBoard";
import _ from  "partial-js";

class EditContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            token:""
        };
    }
    componentDidMount(){
        const {history} = this.props;
        _.go(
            ()=>localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):history.push("/login"),
            (info) => {
                this.setState({
                    token:info.token
                });
            },
            checkLogin,
            (res) => {
                const {response} = res.data;
                const {match} = this.props;
                response.result?match.params.token !== response.token?history.push(`/edit/${response.token}`):_.stop():(()=>{
                    localStorage.removeItem("userInfo");
                    history.push("/login");
                })();
            },
            _.catch(error=>{
                console.log(error);
                localStorage.removeItem("userInfo");
            })
        );
    }
    handlePostClick = (e,num) => {
        const {history} = this.props;
        e.preventDefault();
        history.push(`/post/${num}`);
    }
    handleMenuClick = (btn) => {
        const {DevelopActions} = this.props;
        DevelopActions.menuToggle(btn);
    }
    handleLogout = async () => {
        const {history} = this.props;
        _.go(
            localStorage.removeItem("userInfo"),
            logout,
            (res) => {
                const {response} = res.data;
                response.result?history.push("/login"):console.log(response.error);
            },
            _.catch(error=>
                console.log(error))
        );
    }
    render(){
        const {title, posts, index, menuBtn, match} = this.props;

        const {
            handlePostClick,
            handleMenuClick,
            handleLogout
        } = this;
        const btn = menuBtn.toJS();
        return(
            <div className={styles.App}>
                <header>
                </header>
                <section className={styles.dash_wrap}>
                    <div className={styles.dashbar}>
                        <div className={styles.dash_inner}>
            
                            <nav className={styles.menu}>
                                <header className={styles.dash_head}>
                                    <h3>Dashboard</h3>
                                </header>
                                <ul className={styles.dash_menu}>
                                    <li>
                                        
                                        <a href="#" className={styles.menu_item} onClick={handleLogout}>
                                            <span className={styles.side_title}>로그아웃</span>
                                        </a>
                                       
                                    </li>
                                    <li>
                                        
                                        <Link to={`/edit/${match.params.token}/update`} className={styles.menu_item}>
                                            <span className={styles.side_title}>게시판</span>
                                        </Link>
                                       
                                    </li>
                                    <li>
                                        <a href="#" className={btn.post?cx(styles.menu_item, styles.clicked):styles.menu_item} onClick={(e)=>handleMenuClick("post")}>
                                            <span className={styles.side_title}>게시글</span>
                                            {btn.post?
                                                <span className={styles.opener + " fas fa-chevron-down"}></span>:
                                                <span className={styles.opener + " fas fa-chevron-right"}></span>
                                            }
                                            
                                        </a>
                                        {btn.post?
                                            <ul className={styles.dash_menu}>
                                                <li>
                                                    <a href="#" className={styles.menu_item}>
                                                        <span className={styles.side_title}>모든 게시글</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link to={`/edit/${match.params.token}/write`} className={styles.menu_item}>
                                                        <span className={styles.side_title}>글쓰기</span>
                                                    </Link>
                                                </li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                            :""}
                                    </li>
                                    <li>
                                        <a href="#" className={styles.menu_item}>
                                            <span className={styles.side_title}>회원정보</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
        
                </section>
                <section className={styles.dash_contents}>
                    <Switch>
                        <Route exact={true} path="/edit/:token" component={EditMain}/>
                        <Route exact={true} path="/edit/:token/board" component={EditPost}/>
                        <Route exact={true} path="/edit/:token/board/:bname" component={EditPost}/>
                        <Route exact={true} path="/edit/:token/board/:bname/:num" component={EditRead}/>
                        <Route exact={true} path="/edit/:token/write" component={EditWrite}/>
                        <Route exact={true} path="/edit/:token/write/:num" component={EditWrite}/>
                        <Route exact={true} path="/edit/:token/update" component={EditBoard}/>
                    </Switch>
                </section>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        //현재 게시판 제목, 글 정보
        current: state.develop.get("current"),

        //현재 게시판의 페이지
        page: state.develop.get("page"),
        first: state.develop.get("first"),
        end: state.develop.get("end"),
        menuBtn: state.develop.get("menuBtn")

    }),
    (dispatch) => ({
        DevelopActions: bindActionCreators(developActions, dispatch)
    })  
)(withRouter(EditContainer));
