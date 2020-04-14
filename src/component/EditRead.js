import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";
import {Editor, convertFromRaw, ContentState, EditorState} from "draft-js";
import CommentList from "../component/CommentList";
import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";
import {getReadPost, insertComment, updateComment, getComment, checkComment, deleteComment} from "../lib/api";
import { List, Map, fromJS } from "immutable";
import _ from "partial-js";

class EditRead extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        this.state = {
            data:Map({
                num:"",
                bnum:"",
                board:"",
                time:"",
                title:"",
                hit:"",
                editorState:EditorState.createEmpty(),
                comment:List(),
                commentContent:"",
                commentTitle:"",
                commentPassword:""
            })
        };
    }
    componentDidMount() {
        const {match} = this.props;
        _.go(
            getReadPost(match.params.bname,match.params.num),
            (res) => {
                const {response} = res.data;
                return response.data;
            },
            (data) =>{
                const contentState = convertFromRaw(JSON.parse(data.content));
                this.setState({
                    data:this.state.data.set("num",data.num)
                        .set("bnum",data.bnum)
                        .set("editorState",EditorState.createWithContent(contentState))
                        .set("board",data.board)
                        .set("time",data.insert)
                        .set("title",data.title)
                        .set("hit",data.hit)
                        .set("next",data.next)
                        .set("prev",data.prev)
                });
            }
        );
        _.go(
            getComment(match.params.num),
            (res) => {
                const {response} = res.data;
                console.log(response.result, response.data);
                response.result?this.setState({
                    data:this.state.data.set("comment",fromJS(response.data))
                }):null;
                return response.data;
            }
        );
    }
    handleSubmitComment = () => {
        const {match} = this.props;
        const data = {
            parent:null,
            comment:this.state.data.get("commentContent"),
            post:match.params.num,
            nickname:this.state.data.get("commentTitle"),
            password:this.state.data.get("commentPassword"),
            group_no:null
        };
        _.go(
            insertComment(data),
            (res) => {
                const {response} = res.data;
                console.log(response);
                response.result?window.location.reload():null;
                return response.data;
            }
        );
    }
    handleSubmitReComment = (e,index,parentNum, groupNo) => {
        console.log(groupNo);
        const {match} = this.props;
        const data = {
            parent:parentNum,
            comment:this.state.data.getIn(["comment",index,"commentContent"]),
            post:match.params.num,
            nickname:this.state.data.getIn(["comment",index,"commentTitle"]),
            password:this.state.data.getIn(["comment",index,"commentPassword"]),
            group_no:groupNo
        };
        _.go(
            insertComment(data),
            (res) => {
                const {response} = res.data;
                response.result?window.location.reload():null;
                return response.data;
            }
        );
    }
    handleChangeInput = (e) => {
        this.setState({
            data:this.state.data.set(e.target.name,e.target.value)
        });
    }
    handleChangeReInput = (e, num) => {
        this.setState({
            data:this.state.data.setIn(["comment", num,e.target.name], e.target.value)
        });
    } 
    handleClickReComment = (e,num) => {
        this.setState({
            data:this.state.data.updateIn(["comment", num,"reply"], value=>!value)
        });
    }
    handleClickModify = (e,num) => {
        console.log(num);
        this.setState({
            data:this.state.data.updateIn(["comment", num,"modify"], value=>!value)
        });
    }
    handleChangePassword = (e,num) => {
        this.setState({
            data:this.state.data.setIn(["comment", num,"passwordInput"], e.target.value)
        });
    }
    handleChangeContent = (e,num) =>{
        this.setState({
            data:this.state.data.setIn(["comment", num,"content"], e.target.value)
        });
    }
    handleSubmitPassword = (e,num, index)=>{
        const data = {
            password:this.state.data.getIn(["comment",num,"passwordInput"]),
            num:index
        };
        _.go(
            checkComment(data),
            (res) => {
                const {response} = res.data;
                response.result?this.setState({
                    data:this.state.data.setIn(["comment",num,"checkPassword"],true).setIn(["comment", num,"modify"],false)
                }):null;
                return response.data;
            }
        );
    }
    handleUpdate = (e, num, index) => {
        _.go(
            updateComment(index,this.state.data.getIn(["comment",num,"content"])),
            (res) => {
                const {response} = res.data;
                response.result?window.location.reload():null;
                return response.data;
            }
        );
    }
    handleDelete = (e, index) =>{
        _.go(
            deleteComment(index),
            (res) => {
                const {response} = res.data;
                response.result?window.location.reload():null;
                return response.data;
            }
        );
    }
    render(){
        const {data} = this.state;
        const {handleDelete,handleUpdate,handleChangeContent,handleSubmitPassword,handleChangePassword, handleChangeInput, handleSubmitComment, handleChangeReInput, handleClickReComment, handleSubmitReComment, handleClickModify} = this;
        const {num, bnum, editorState, board, time, title, hit, next, prev, commentContent, commentPassword, commentTitle} = data.toJS();
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_12, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.path}>
                                            <h3>{board} > {title}</h3>
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
                                                    <h2>{title}</h2>
                                                </div>
                                                <div className={styles.read_info}>
                                                조회수 {hit} {time}
                                                </div>
                                            </div>
                                            <div className={"read_content"}>
                                                <Editor readOnly={true} editorState={editorState} />
                                            </div>
                                            <div className={styles.read_comment_list}>
                                                <ul>
                                                    <CommentList
                                                        data={data.get("comment")}
                                                        onChange={handleChangeReInput}
                                                        onClick={handleClickReComment}
                                                        onSubmit={handleSubmitReComment}
                                                        onModify={handleClickModify}
                                                        onPassword={handleChangePassword}
                                                        onClickPassword={handleSubmitPassword}
                                                        onContent={handleChangeContent}
                                                        onUpdate={handleUpdate}
                                                        onDelete={handleDelete}
                                                    />
                                                </ul>
                                            </div>
                                            <div className={styles.write_comment}>
                                                <div className={styles.write_comment_title}>
                                                    <input type="text" name="commentTitle" onChange={handleChangeInput} value={commentTitle} placeholder="닉네임"></input>
                                                    <input type="text" name="commentPassword" onChange={handleChangeInput} value={commentPassword} placeholder="비밀번호"></input>
                                                </div>
                                                <div className={styles.write_comment_content}>
                                                    <textarea rows="4" name="commentContent" onChange={handleChangeInput} value={commentContent} placeholder="내용"></textarea>
                                                </div>
                                                <div className={styles.comment_submit}>
                                                    <button className={cx(styles.btn_l)} onClick={handleSubmitComment}>확인</button>
                                                </div>
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
)(EditRead);