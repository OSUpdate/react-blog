import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";
import * as boardActions from "../modules/board";
import * as postActions from "../modules/post";
import {getAllComment, getVisitChart, getVisitList} from "../lib/api";
import styles from "../App.css";
import cx from "classnames";
import _ from "partial-js";
import { List, Map, fromJS } from "immutable";


class EditMain extends Component {
    constructor(props){
        super(props);
        this.state={
            data:Map({
                post:List(),
                comment:List(),
                ip:List(),
                count:0,
                chart:Map({
                    labels: List(),
                    datasets: List([
                        Map({
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
                            data: List()
                        })
                    ])
                })
            })
        };
    }
    async componentDidMount(){
        const {PostActions} = this.props;
        await PostActions.getAllPost(1);
        this.setState({
            data:this.state.data.set("post",this.props.post)
        });
        _.go(
            getAllComment(),
            (res) => {
                const {response} = res.data;
                response.result?this.setState({
                    data:this.state.data.set("comment",fromJS(response.data))
                }):null;
            }
        );
        _.go(
            getVisitChart(),
            (res) => {
                const {response} = res.data;
                response.result?this.setState({
                    data:this.state.data.setIn(["chart","labels"],fromJS(response.data.mon)).setIn(["chart","datasets",0,"data"],fromJS(response.data.cnt))
                }):null;
            }
        );
        _.go(
            getVisitList(),
            (res) => {
                const {response} = res.data;
                response.result?this.setState({
                    data:this.state.data.set("ip",fromJS(response.data.ip)).set("count",response.data.cnt)
                }):null;
            }
        );
    }
    setList = (data) =>{
        const arr = data.map((item,index)=>{
            const {title}=item.toJS();
            return (
                <li key={index} className={styles.scroll_item}>
                    {title}
                </li>
            );
        });
        return arr;
    }
    render(){
        const {setList} = this;
        //console.log(this.state.data.get("post").toJS());
        return(
            <div className={styles.container}>
                <div className={styles.container_fluid}>
                    <div className={styles.row}>
                        <div className={cx(styles.col_lg_9, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                            <div className={styles.dash_title}>
                                <h2>Blog</h2>
                                <p>방문자 {this.state.data.get("count")}명</p>
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
                                        data={this.state.data.get("chart").toJS()}
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
                                                {setList(this.state.data.get("ip"))}
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
                                                {setList(this.state.data.get("comment"))}
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
                                                {setList(this.state.data.get("post"))}
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
        board:state.board.get("board"),
        post:state.post.get("post"),
        total:state.post.get("total")

    }),
    (dispatch) => ({
        BoardActions: bindActionCreators(boardActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })  
)(EditMain);