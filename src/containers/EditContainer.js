import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter, Switch, Route} from "react-router-dom";
import {Line} from "react-chartjs-2";
import cx from "classnames";
import * as developActions from "../modules/development";
import styles from "../App.css";
import EditMainContainer from "./EditMainContainer";
import EditPostContainer from "./EditPostContainer";
import EditReadContainer from "./EditReadContainer";
import EditWriteContainer from "./EditWriteContainer";
class EditContainer extends Component {
    
    handlePostClick = (e,num) => {
        const {history} = this.props;
        e.preventDefault();
        history.push(`/post/${num}`);
    }
    handleMenuClick = (btn) => {
        const {DevelopActions} = this.props;
        DevelopActions.menuToggle(btn);
    }
    render(){
        const {title, posts, index, menuBtn} = this.props;
        
        const {
            handlePostClick,
            handleMenuClick
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
                                        
                                        <a href="#" className={btn.board?cx(styles.menu_item, styles.clicked):styles.menu_item} onClick={(e)=>handleMenuClick("board")}>
                                            <span className={styles.side_title}>게시판</span>
                                            {btn.board?
                                                <span className={styles.opener + " fas fa-chevron-down"}></span>:
                                                <span className={styles.opener + " fas fa-chevron-right"}></span>
                                            }
                                        </a>
                                       
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
                                                    <a href="#" className={styles.menu_item}>
                                                        <span className={styles.side_title}>글쓰기</span>
                                                    </a>
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
                        <Route exact path="/edit/:token" component={EditMainContainer}/>
                        <Route exact path="/edit/:token/board" component={EditPostContainer}/>
                        <Route exact path="/edit/:token/board/:bname" component={EditPostContainer}/>
                        <Route exact path="/edit/:token/board/:bname/:num" component={EditReadContainer}/>
                        <Route exact path="/edit/:token/write" component={EditWriteContainer}/>
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
