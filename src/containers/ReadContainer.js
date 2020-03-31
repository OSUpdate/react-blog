import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as viewActions from "../modules/view";
import styles from "../App.css";
import classNames from "classnames";
const cx = classNames.bind(styles);

class ReadContainer extends Component {
    render(){
        const {title, posts, index} = this.props;

        const {handlePostClick} = this;

        return(
            <section className={styles.contents}>
                <div className={styles.contents_inner}>
                    <div className={styles.title}>
                        <h3>경로 표시 영역</h3>
                    </div>
                    <div className={styles.content_card}>
                        <div className={styles.card_title}>
                            <h2>글 제목</h2>
                            <p>2020-3-31 15:51</p>
                        </div>
                        <div className={styles.card_content}>
                            <p>게시글 내용</p>
                        </div>
                    </div>
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
        //현재 게시글 정보
        data: state.view.get("current"),

        //현재 게시글 번호
        num: state.view.get("num"),

    }),
    (dispatch) => ({
        ViewActions: bindActionCreators(viewActions, dispatch)
    })  
)(withRouter(ReadContainer));
