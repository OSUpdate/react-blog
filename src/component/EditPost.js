import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";

import EditPostList from "./EditPostList";
import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";

class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[
                {
                    title:"테스트",
                    time:"날짜",
                    checked:false
                },
                {
                    title:"테스트1",
                    time:"날짜",
                    checked:false
                },
                {
                    title:"테스트2",
                    time:"날짜",
                    checked:false
                },
                {
                    title:"테스트3",
                    time:"날짜",
                    checked:false
                },
                {
                    title:"테스트4",
                    time:"날짜",
                    checked:false
                }
            ]
        };
    }
    handleChecked = (e)=>{
        const clickButton = this.state.list.map(item => {
            if(item.title === e.target.value)
                item.checked = !item.checked;
            return item;
        });
        this.setState({
            list:clickButton
        });
    }
    render(){
        const {list} = this.state;
        const {handleChecked} = this;
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_3, styles.col_md_3, styles.col_sm_3, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.none_panel_title}><h3>게시판 목록</h3></div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                <li className={styles.none_item}>
                                                테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                                <li className={styles.none_item}>
                                            테스트
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx(styles.col_lg_6, styles.col_md_9, styles.col_sm_9, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel}>
                                        <div className={cx(styles.panel_title, styles.list_title)}>
                                            <span className={styles.style_button}>새로고침</span>
                                            <span className={styles.style_button}>전체선택</span>
                                            <span className={styles.style_button}>삭제</span>
                                        </div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                
                                                <EditPostList
                                                    posts={list}
                                                    onChange={handleChecked}
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        
    }),
    (dispatch) => ({
        //AccountActions: bindActionCreators(accountActions, dispatch)
    })  
)(EditPost);