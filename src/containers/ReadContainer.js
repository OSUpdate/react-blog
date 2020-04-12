import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter,Link} from "react-router-dom";

import { List, Map, fromJS } from "immutable";
import styles from "../App.css";
import classNames from "classnames";
import {getReadPost, insertComment, updateComment, getComment} from "../lib/api";
import _ from  "partial-js";
import {Editor, convertFromRaw, ContentState, EditorState} from "draft-js";
const cx = classNames.bind(styles);

class ReadContainer extends Component {
    constructor(props){
        super(props);
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
    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.num !== this.props.match.params.num){
            _.go(
                getReadPost(this.props.match.params.name,this.props.match.params.num),
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
        }
    }
    componentDidMount() {
        const {match} = this.props;
        _.go(
            getReadPost(match.params.name,match.params.num),
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
            comment:this.state.data.get("commentContent"),
            post:match.params.num,
            nickname:this.state.data.get("commentTitle"),
            password:this.state.data.get("commentPassword"),
        };
        _.go(
            insertComment(data),
            (res) => {
                const {response} = res.data;
                
                return response.data;
            }
        );
    }
    handleChangeInput = (e) => {
        this.setState({
            data:this.state.data.set(e.target.name,e.target.value)
        });
    }
    setCommentList = () => {
        const {data} = this.state;
        const arr = data.get("comment");
        //console.log(arr,arr.toJS());
        return arr.map(item=>{
            const {num,post,comment,insert_date,update_date,nickname,parent} = item.toJS();
            return (
                <li className={styles.comment_item} key={num}>
                    {!parent?
                        <React.Fragment>
                            <div className={styles.comment_title}>
                                <span className={styles.comment_nick}>{nickname}</span>
                                <span className={styles.comment_time}>{insert_date}</span>
                                <span className={styles.right_float}>수정/삭제</span>
                                <span className={styles.right_float}>댓글작성</span>
                            </div>
                            <div className={styles.comment_content}>
                                <p>{comment}</p>
                            </div>
                        </React.Fragment>
                        :
                        <ul>
                            <li className={styles.comment_item}>
                                <div className={styles.comment_title}>
                                    <span className={styles.comment_nick}>닉네임</span>
                                    <span className={styles.comment_time}>시간</span>
                                    <span className={styles.right_float}>버튼</span>
                                </div>
                                <div className={styles.comment_content}>
                                    <p>테스트</p>
                                </div>
                            </li>
                        </ul>
                    }
                </li>
            );
        });
    }

    render(){

        const {handlePostClick, handleChangeInput, handleSubmitComment, setCommentList} = this;

        const {num, bnum, editorState, board, time, title, hit, next, prev, commentContent, commentPassword, commentTitle} = this.state.data.toJS();
        const commentList = this.setCommentList();
        return(
            <section className={styles.contents}>
                {prev?
                    <div className={styles.side_left}>
                        <Link to={`/board/${bnum}/${prev}`}>
                            <span className={"fas fa-chevron-left "+ styles.side_center}></span>
                        </Link>
                    </div>
                    :""}
                <div className={styles.contents_inner}>
                    <div className={styles.title}>
                        <h3>{board}</h3>
                    </div>
                    <div className={styles.content_card}>
                        <div className={styles.card_title}>
                            <h2>{title}</h2>
                        </div>
                        <div className={styles.card_content}>
                            <div className={styles.datas}>
                                <div className={cx(styles.left, styles.inline)}>조회수 {hit}</div>
                                <div className={cx(styles.right, styles.inline, styles.right_float)}>{time}</div>
                            </div>
                            
                            <div className={"read_content"}>
                                <Editor readOnly={true} editorState={editorState} />
                            </div>
                            <div className={styles.read_comment_list}>
                                <ul>
                                    {commentList}
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
                                <div className={cx(styles.comment_submit)}>
                                    <button className={cx(styles.btn_l)} onClick={handleSubmitComment}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {next?
                    <div className={styles.side_right}>
                        <Link to={`/board/${bnum}/${next}`}>
                            <span className={"fas fa-chevron-right "+styles.side_center}></span>
                        </Link>
                    </div>
                    :""}
            </section>
        );
    }
}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })  
)(withRouter(ReadContainer));
