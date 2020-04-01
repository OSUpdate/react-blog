import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as viewActions from "../modules/view";
import styles from "../App.css";
import PostList from "../component/PostList";
import cx from "classnames";

class PostContainer extends Component {
    
    handlePostClick = (title) => {
        return (num) => {
            const {history} = this.props;
            history.push(`/board/${title}/${num}`);
        };
    }
    pageNum = (first, end, page) => {
        let temp = new Array();
        for(let i = first; i<=end;i++){
            temp.push(<a className={i==page?cx(styles.pg_page, styles.current_page):styles.pg_page}>{i}</a>);
        }
        return temp;
    }
    render(){
        const { current, first, end, page } = this.props;

        const {
            handlePostClick,
            pageNum
        } = this;
        const data = current.toJS();
        const onClick = handlePostClick(data.title);
        const pages = pageNum(first,end, page);
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
                    <nav className={styles.pg_wrap}>
                        {pages}
                    </nav>
                </div>
                <div className={styles.slide}>
                    <div className={styles.slide_inner}>
                        <div className={styles.left}>
                            <span className={"fas fa-chevron-left "}></span>
                        </div>
                        <div className={styles.right}>
                            <span className={"fas fa-chevron-right "}></span>
                        </div>
                    </div>
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
