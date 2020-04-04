import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";


import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";


const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "방문자 수",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};


class EditMain extends Component {

    render(){
        return(
            <div className={styles.container}>
                <div className={styles.container_fluid}>
                    <div className={styles.row}>
                        <div className={cx(styles.col_lg_9, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                            <div className={styles.dash_title}>
                                <h2>Blog</h2>
                                <p>방문자 10명</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_6, styles.col_md_9, styles.col_sm_9, styles.col_xs_12)}>
                                <div className={cx(styles.board_card,styles.visit)}>
                                    <Line 
                                        data={data}
                                        height={270}
                                        options={{ maintainAspectRatio: false }}
                                    />
        
                                </div>
                            </div>
                            <div className={cx(styles.col_lg_3, styles.col_md_3, styles.col_sm_3, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.panel}>
                                        <div className={styles.panel_title}><h3>방문자 IP</h3></div>
                                        <div className={styles.scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                <li className={styles.scroll_item}>
                                                        테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                    테스트
                                                </li>
                                            </ul>
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
                            <div className={cx(styles.col_lg_3, styles.col_md_6, styles.col_sm_6, styles.col_xs_12)}>
                                <div className={styles.board_card}>
                                    <div className={styles.panel}>
                                        <div className={styles.panel_title}><h3>댓글 목록</h3></div>
                                        <div className={styles.scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                <li className={styles.scroll_item}>
                                                테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx(styles.col_lg_3, styles.col_md_6, styles.col_sm_6, styles.col_xs_12)}>
                                <div className={styles.board_card}>
                                    <div className={styles.panel}>
                                        <div className={styles.panel_title}><h3>게시글 목록</h3></div>
                                        <div className={styles.scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                <li className={styles.scroll_item}>
                                                        테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                        테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                        테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                        테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                                        테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
                                                <li className={styles.scroll_item}>
                                            테스트
                                                </li>
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
        
        signIn: state.account.get("signIn"),
        token: state.account.get("token")
        
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })  
)(EditMain);