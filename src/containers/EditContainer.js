import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as viewActions from "../modules/view";
import styles from "../App.css";
import PostList from "../component/PostList";

class PostContainer extends Component {
    
    handlePostClick = (e,num) => {
        const {history} = this.props;
        e.preventDefault();
        history.push(`/post/${num}`);
    }
    render(){
        const {title, posts, index} = this.props;

        const {handlePostClick} = this;

        return(
            <section className={styles.contents}>
                
            </section>
        );
    }
}

export default connect(
    (state) => ({
        //현재 게시판 제목, 글 정보
        current: state.view.get("current"),

        //현재 게시판의 페이지
        page: state.view.get("page"),
        first: state.view.get("first"),
        end: state.view.get("end")

    }),
    (dispatch) => ({
        ViewActions: bindActionCreators(viewActions, dispatch)
    })  
)(withRouter(PostContainer));