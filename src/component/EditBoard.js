import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {getBoards, updateBoard, insertBoard} from "../lib/api";
import { List, Map, fromJS } from "immutable";
import EditBoardList from "./EditBoardList";
import * as boardActions from "../modules/board";
import styles from "../App.css";
import cx from "classnames";
import EditBoardItem from "./EditBoardItem";
import _ from  "partial-js";

class EditBoard extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            data:Map({
                activeDelete:false,
                list:List()
            })
        };
    }
    componentDidMount(){
        const {board} = this.props;
        this.setState({
            data:this.state.data.set("list",board)
        });
        /*
        _.go(
            getBoards(),
            (res) => {
                const {response} = res.data;
                return response.data;
            },
            _.map(item=>Map(item)),
            (list)=>this.setState({
                list:List(list)
            }),
            _.catch(error=>{console.log(error);})
        );
        */
    }
    stateButton = (token, num, state, value) => {
        const { BoardActions, board } = this.props;
        state === "수정"?BoardActions.modify(num):
            state === "확인"?board.getIn([num,"new"])?(()=>{
                BoardActions.insertBoard(token,value);
                BoardActions.confirm(num);
            })():((orderNo)=>{
                BoardActions.updateBoard(token,orderNo,value);
                BoardActions.modify(num);
            })(board.getIn([num,"orderNo"])):"";
        /*
        const modify = {
            "수정":BoardActions.modify(num),
            "확인":board.getIn([num,"new"])?(()=>{
                BoardActions.insertBoard(token,value);
                BoardActions.confirm(num);
            })():((orderNo)=>{
                BoardActions.updateBoard(token,orderNo,value);
                BoardActions.modify(num);
            })(board.getIn([num,"orderNo"]))
        };
        return modify[state];
        */
    }
    handleActiveButton = (list) => {
        return _.every(list,item => item.checked === false)?
            false:true;
    }
    /*
    handleChecked = (e)=>{
        this.setState({ 
            list:_.map(this.state.list,item => {
                const {title, checked} = item.toJS();
                if(item.title === e.target.value)
                    item.checked = !item.checked;
                return item;
            }),
            activeDelete:this.handleActiveButton(this.state.list.toJS())
        });
    }
    */
    handleAddClick = (e) =>{
        let temp = this.state.list.toJS();
        this.setState({
            list:fromJS(temp.concat({num:temp[temp.length-1].num+1,title:"",update:true,new:true}))
        });
    }
    handleChangeInput = (e, order) => {
        const {BoardActions} = this.props;
        BoardActions.updateTitle(order,e.target.value);
        /*
        this.setState({
            list:this.state.list.setIn([order,"title"],e.target.value)
        });
        */
    }
    handleConfirmInput = (e, num, state) => {
        const {match} = this.props;
        this.stateButton(match.params.token,num,state,this.props.board.getIn([num,"title"]));
    }
    handleDeleteItem = (e, num) => {
        _.removeByIndex(this.state.list,_.findIndex(this.state.list,(item)=>item.num === num));
        this.setState({
            list:this.state.list
        });

    }
    render(){
        const {activeDelete} = this.state;
        const {board} = this.props;
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
                                                    boards={board}
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
        board:state.board.get("board")
    }),
    (dispatch) => ({
        BoardActions: bindActionCreators(boardActions, dispatch)
    })  
)(EditBoard);