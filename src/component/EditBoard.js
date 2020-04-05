import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";

import EditBoardList from "./EditBoardList";
import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";
import EditBoardItem from "./EditBoardItem";
import _ from  "partial-js";

class EditBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeDelete:false,
            list:[
                {
                    num:1,
                    title:"테스트",
                    update:false
                },
                {
                    num:2,
                    title:"테스트1",
                    update:false
                },
                {
                    num:3,
                    title:"테스트2",
                    update:false
                },
                {
                    num:4,
                    title:"테스트3",
                    update:false
                },
                {
                    num:5,
                    title:"테스트4",
                    update:false
                }
            ]
        };
    }
    handleActiveButton = (list) => {
        return _.every(list,item => item.checked === false)?
            false:true;
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
    
    handleAddClick = (e) =>{
        this.setState({
            list:this.state.list.concat({num:this.state.list[this.state.list.length-1].num+1,title:"",update:true})
        });
        console.log(this.state.list);
    }
    handleChangeInput = (e, num) => {
        this.setState({
            list:_.map(this.state.list,item=>{
                if(item.num === num)
                    item.title = e.target.value;
                return item;
            })
        });
    }
    handleConfirmInput = (e, num) => {
        this.setState({
            list:_.map(this.state.list,item=>{
                if(item.num === num)
                    item.update = !item.update;
                return item;
            })
        });
    }
    handleDeleteItem = (e, num) => {
        _.removeByIndex(this.state.list,_.findIndex(this.state.list,(item)=>item.num === num));
        this.setState({
            list:this.state.list
        });

    }
    render(){
        const {list,activeDelete} = this.state;
        const {handleChecked,handleAddClick, handleChangeInput, handleConfirmInput, handleDeleteItem} = this;
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_9, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel}>
                                        <div className={cx(styles.panel_title, styles.list_title)}>
                                            <span className={cx(styles.style_button, styles.hover)}>새로고침</span>
                                            <span className={cx(styles.style_button, styles.hover)} onClick={handleAddClick}>추가</span>
                                        </div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                
                                                <EditBoardList
                                                    boards={list}
                                                    onChange={handleChangeInput}
                                                    onClick={handleConfirmInput}
                                                    onDelete={handleDeleteItem}
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
)(EditBoard);