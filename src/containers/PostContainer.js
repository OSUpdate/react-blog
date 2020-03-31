import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as viewActions from "../modules/view";
import styles from "../App.css";
import PostList from "../component/PostList";

class PostContainer extends Component {
    
    handlePostClick = (title) => {
        return (num) => {
            const {history} = this.props;
            history.push(`/board/${title}/${num}`);
        };
    }
    render(){
        const { current, index } = this.props;

        const {handlePostClick} = this;
        const data = current.toJS();
        const onClick = handlePostClick(data.title);
        return(
            <section className={styles.contents}>
                <div className={styles.contents_inner}>
            
                    <div className={styles.title}>
                        <h2>{data.title}</h2>
                    </div>
                    <PostList
                        current={data.list}
                        onClick={onClick}
                        
                    />
                </div>
                <div className={styles.slide}>
                    <span className={"fas fa-chevron-left "+styles.left}></span>
                    <span className={"fas fa-chevron-right "+styles.right}></span>
                </div>
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
