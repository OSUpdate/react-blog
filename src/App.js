import React, {Component} from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import * as postActions from "./modules/post";
import * as boardActions from "./modules/board";
import styles from "./App.css";
import PostContainer from "./containers/PostContainer";
import ReadContainer from "./containers/ReadContainer";
import { withRouter, Switch, Route } from "react-router-dom";
import cx from "classnames";
import _ from  "partial-js";

class App extends Component {
    componentDidMount(){
        const {BoardActions,PostActions} = this.props;
        BoardActions.getBoard();
        PostActions.getPosts(1,1);
    }
    render() {
        const {board} = this.props;
        const boards = _.map(board.toJS(),item=>{
            const {title,orderNo} = item;
            return (
                <li >
                    <Link to={`/board/${orderNo}`} className={styles.menu_item}>
                        <span className={styles.side_title}>{title}</span>
                    </Link>
                </li>
            );
        });
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
                                    <Link to={"/board/all"}>
                                        <h3>전체 글</h3>
                                    </Link>
                                </header>
                                <ul>
                                    {boards}
                                    
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
        board:state.board.get("board"),
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        BoardActions: bindActionCreators(boardActions, dispatch),
        
    })  
)(withRouter(App));
