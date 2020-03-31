import React, {Component} from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import * as viewActions from "./modules/view";
import styles from "./App.css";
import PostContainer from "./containers/PostContainer";
import ReadContainer from "./containers/ReadContainer";
import { withRouter, Switch, Route } from "react-router-dom";
class App extends Component {
    render() {
        return(
            <div className={styles.App}>
                <header id={styles.banner}>
                </header>
                <div className={styles.titlebar}>

                    <a href="#" className={styles.toggle + " fas fa-bars"}></a>
                    <a href="#">blog</a>
                </div>
                <section className={styles.wrapper}>
                    <div className={styles.sidebar}>
                        <div className={styles.search}>
                            <form className={"fas"}>
                                <input type="text" name="query" id="query" placeholder="Search"/>
                            </form>
                        </div>
                        <div className={styles.inner}>
            
                            <nav className={styles.menu}>
                                <header>
                                    <h3>전체 글</h3>
                                </header>
                                <ul>
                                    <li><a href="#">Menu</a></li>
                                    <li><span className={styles.opener + " fas fa-chevron-down"}>Sub Menu</span></li>
                                    <li><a href="#">Menu</a></li>
                                    <li><a href="#">Menu</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/" component={PostContainer}/>
                        <Route exact path="/board/:name" component={PostContainer}/>
                        <Route exact path="/board/:name/:num" component={ReadContainer}/>
                    </Switch>
        
                </section>

            </div>
        );
    }
}
export default connect(
    (state) => ({
        //게시판 이름 정보
        menu: state.view.get("menu"),

        //현재 게시판의 페이지
        toggle:state.view.get("menu")

    }),
    (dispatch) => ({
        ViewActions: bindActionCreators(viewActions, dispatch)
    })  
)(withRouter(App));
