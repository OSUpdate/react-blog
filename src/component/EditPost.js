import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";

import EditPostList from "./EditPostList";
import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";
import _ from  "partial-js";

class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeDelete:false,
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
    handleActiveButton = (list) => {
        return _.every(list,item => item.checked === false)?
            false:true;
    }
    setPage = (first, end, page) => {
        let temp = new Array();
        for(let i = first; i<=end;i++){
            temp.push(<a key={i} className={i==page?cx(styles.pg_page, styles.current_page):styles.pg_page}>{i}</a>);
        }
        return temp;
    }
    handleAllCheck = (e) => {
        _.go(
            _.mr(this.state.list,_.every(this.state.list,item=>item.checked === false)),
            (list,checked) => checked?
                _.map(list,item=>{
                    item.checked=true;
                    return item;
                }):
                _.every(this.state.list,item=>item.checked === true)?
                    _.map(list,item=>{
                        item.checked=false;
                        return item;
                    }):
                    _.map(list,item=>{
                        item.checked=true;
                        return item;
                    })

            ,
            (list) => this.setState({
                list:list,
                activeDelete:this.handleActiveButton(list)
            })
        );
    }
    handleChecked = (e)=>{
        this.setState({
            list:_.map(this.state.list,item => {
                if(item.title === e.target.value)
                    item.checked = !item.checked;
                return item;
            }),
            activeDelete:this.handleActiveButton(this.state.list)
        });
    }
    render(){
        const {list,activeDelete} = this.state;
        const {handleChecked,handleAllCheck, setPage} = this;
        const pages = setPage(1,10,1);
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
                                            <span className={cx(styles.style_button, styles.hover)}>새로고침</span>
                                            <span className={cx(styles.style_button, styles.hover)} onClick={handleAllCheck}>전체선택</span>
                                            <span className={activeDelete?cx(styles.style_button, styles.active_red):styles.style_button}>삭제</span>
                                        </div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                
                                                <EditPostList
                                                    posts={list}
                                                    onChange={handleChecked}
                                                />
                                            </ul>
                                            <nav className={styles.pg_wrap}>
                                                <a className={"fas fa-chevron-left"}></a>
                                                {pages}
                                                <a className={"fas fa-chevron-right"}></a>
                                            </nav>
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
        //boards:state.edit.get("boards"),
        //posts:state.edit.get("posts"),

    }),
    (dispatch) => ({
        //AccountActions: bindActionCreators(accountActions, dispatch)
    })  
)(EditPost);