import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";


import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";


class EditReadContainer extends Component {

    render(){
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_12, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.path}>
                                            <h3>경로</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_12, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.read_container}>
                                            <div className={styles.read_head}>
                                                <div className={styles.read_title}>
                                                    <h2>제목</h2>
                                                </div>
                                                <div className={styles.read_info}>
                                                조회수 시간
                                                </div>
                                            </div>
                                            <div className={styles.read_content}>
                                                내용
                                            </div>
                                            <div className={styles.read_comment_list}>
                                                <ul>
                                                    <li>테스트</li>
                                                </ul>
                                            </div>
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
)(EditReadContainer);