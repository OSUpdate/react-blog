import React, {Component} from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import * as postActions from "./modules/post";
import * as boardActions from "./modules/board";
import styles from "./App.css";
import {setVisit} from "./lib/api";
import PostContainer from "./containers/PostContainer";
import ReadContainer from "./containers/ReadContainer";
import { withRouter, Switch, Route } from "react-router-dom";
import cx from "classnames";
import _ from  "partial-js";

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            toggle:false
        };
    }
    componentDidMount(){
        const {BoardActions,PostActions} = this.props;
        _.go(
            setVisit(window.location.href),
            (res)=>{
                const{response}=res.data;
                console.log(response);
                return response;
            }
        );
        BoardActions.getBoard();
        PostActions.getPosts(1,1);
    }
    handleToggleMenu = () => {
        this.setState({
            toggle:!this.state.toggle
        });
    }
    render() {
        const {board} = this.props;
        const {toggle} = this.state;
        const {handleToggleMenu} = this;
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

                    <a href="#" className={cx(styles.toggle," fas fa-bars")} onClick={handleToggleMenu}></a>
                    <a href="#">blog</a>
                </div>
                <section className={styles.wrapper}>
                    <div className={cx(styles.sidebar,toggle?styles.sidebar_toggle:"")}>
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
