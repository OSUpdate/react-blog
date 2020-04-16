import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import { List, Map, fromJS } from "immutable";
import EditPostList from "./EditPostList";
import * as boardActions from "../modules/board";
import * as postActions from "../modules/post";
import {deletePost} from "../lib/api";
import styles from "../App.css";
import cx from "classnames";
import queryString from "query-string";
import _ from  "partial-js";


class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:Map({
                currentPage:1,
                next:false,
                prev:false,
                per:10,
                block:10,
                totalBlock:1,
                totalPage:1,
                nowBlock:1,
                total:1,
                list:List(),
                activeDelete:false,
                currentBoard:1
            })
        };
    }
    
    async componentDidUpdate(prevProps, prevState){
        const {PostActions} = this.props;
        
        if((prevProps.match.params.bname !== this.props.match.params.bname) || 
            queryString.parse(this.props.location.search).page !== queryString.parse(prevProps.location.search).page){

            const page = queryString.parse(this.props.location.search).page?queryString.parse(location.search).page:1;
            const name = this.props.match.params.bname?this.props.match.params.bname:1;
            await PostActions.getPosts(name,page);
            const totalPage = Math.ceil(this.props.total/this.state.data.get("per"));
            const totalBlock = Math.ceil(totalPage/this.state.data.get("block"));
            const nowBlock = Math.ceil(page/this.state.data.get("block"));
            const next = nowBlock < totalBlock?true:false;
            const prev = nowBlock > 1?true:false;
            console.log(this.props.post);
            this.setState({
                data:this.state.data.set("currentBoard",name)
                    .set("list",this.props.post)
                    .set("total", this.props.total)
                    .set("totalPage",totalPage)
                    .set("totalBlock",totalBlock)
                    .set("nowBlock",nowBlock)
                    .set("currentPage",page)
                    .set("next",next)
                    .set("prev",prev)
            });
        }
            
        return;
    }
    async componentDidMount(){
        const {PostActions,location} = this.props;
        const page = queryString.parse(location.search).page?queryString.parse(location.search).page:1;
        const name = this.props.match.params.bname?this.props.match.params.bname:1;
        await PostActions.getPosts(name,page);
        const totalPage = Math.ceil(this.props.total/this.state.data.get("per"));
        const totalBlock = Math.ceil(totalPage/this.state.data.get("block"));
        const nowBlock = Math.ceil(page/this.state.data.get("block"));
        const next = nowBlock < totalBlock?true:false;
        const prev = nowBlock > 1?true:false;
        console.log(this.props.post);
        this.setState({
            data:this.state.data.set("currentBoard",this.props.match.params.bname)
                .set("list",this.props.post)
                .set("total", this.props.total)
                .set("totalPage",totalPage)
                .set("totalBlock",totalBlock)
                .set("nowBlock",nowBlock)
                .set("currentPage",page)
                .set("next",next)
                .set("prev",prev)
        });
    }
    handleActiveButton = (list) => {
        return _.every(list,item => item.checked === false)?false:true;
    }
    setPage = () => {
        const {data} = this.state;
        const {match} = this.props;
        let temp = new Array();
        const start = (10*(data.get("nowBlock")-1)+1) <= 1?1:(10*(data.get("nowBlock")-1)+1);
        const end = data.get("nowBlock")*data.get("block") >= data.get("totalPage")?data.get("totalPage"):data.get("nowBlock")*data.get("block");
        const currentPage = queryString.parse(this.props.location.search).page?queryString.parse(this.props.location.search).page:1;
        data.get("prev")?temp.push(<Link key={start-1} to={`/edit/${match.params.token}/board/${match.params.bname}?page=${start-1}`} className={styles.prev+" fas fa-chevron-left"}></Link>):"";
        
        for(let i = start; i<=end;i++){
            temp.push(<Link to={`/edit/${match.params.token}/board/${match.params.bname}?page=${i}`} key={i} className={i===Number(currentPage)?cx(styles.pg_page, styles.current_page):styles.pg_page}>{i}</Link>);
        }
        data.get("next")?temp.push(<Link key={end+1} to={`/edit/${match.params.token}/board/${match.params.bname}?page=${end+1}`} className={styles.next+" fas fa-chevron-right"}></Link>):"";
        return temp;
    }
    handleAllCheck = (e) => {
        /*
        const {PostActions} = this.props;
        PostActions.allCheckToggle();
        */
        const {data} = this.state;
        const arr = data.get("list").toJS();
        _.go(
            _.mr(arr,_.every(arr,item=>item.checked === false)),
            (list,checked) => checked?
                List(_.map(list,item=>{
                    item.checked=true;
                    return Map(item);
                })):
                _.every(arr,item=>item.checked === true)?
                    List(_.map(list,item=>{
                        item.checked=false;
                        return Map(item);
                    })):
                    List(_.map(list,item=>{
                        item.checked=true;
                        return Map(item);
                    }))

            ,
            (list) => this.setState({
                data:data.set("list",list).set("activeDelete", this.handleActiveButton(list.toJS()))
            })
        );
        
    }
    handleChecked = (e, num)=>{
        const {data} = this.state;
        const index = data.get("list").findIndex(item=>item.get("num")===num);
        console.log();
        let temp = data.updateIn(["list",index,"checked"], check=>!check).toJS();
        temp.activeDelete = _.every(temp.list,item=>item.checked===false)?false:true;
        this.setState({
            data:fromJS(temp)
        });

    }
    handleDelete = (e) => {
        const {data} = this.state;
        const {PostActions, match, history} = this.props;
        const arr = data.get("list").toJS();
        _.go(
            _.reduce(arr,(acc,item) => {
                item.checked === true?acc.push(item):null;
                return acc;
            },[]),
            _.map(item=>_.pick(item,["num", "bnum"])),
            (list)=>deletePost(match.params.token,list),
            (res) => {
                console.log(res);
                return res.data.response.result?window.location.reload():_.stop();
            }
        );

    }
    setBoard = () => {
        const {match} = this.props;
        return this.props.board.map((board,index)=>{
            const {title,orderNo} = board.toJS();
            return (<li key={index} className={styles.none_item} value={orderNo}><Link to={`/edit/${match.params.token}/board/${orderNo}?page=1`}>{title}</Link></li>);
        });
    }
    render(){
        const {data} = this.state;
        const {post,match} = this.props;
        const {handleChecked,handleAllCheck, setPage, setBoard, handleDelete} = this;
        const pages = setPage();
        const board = setBoard();
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_3, styles.col_md_3, styles.col_sm_3, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.none_panel_title}><span>게시판 목록</span></div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                {board}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx(styles.col_lg_6, styles.col_md_9, styles.col_sm_9, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel}>
                                        <div className={cx(styles.panel_title, styles.list_title)}>
                                            <span className={cx(styles.style_button, styles.hover)} onClick={(e)=>window.location.reload()}>새로고침</span>
                                            <span className={cx(styles.style_button, styles.hover)} onClick={handleAllCheck}>전체선택</span>
                                            <span className={data.get("activeDelete")?cx(styles.style_button, styles.active_red):styles.style_button} onClick={data.get("activeDelete")?handleDelete:null}>삭제</span>
                                        </div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                
                                                <EditPostList
                                                    posts={data.get("list")}
                                                    onChange={handleChecked}
                                                    token={match.params.token}
                                                />
                                            </ul>
                                            <nav className={styles.pg_wrap}>
                                                
                                                {pages}
                                                
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
        board:state.board.get("board"),
        post:state.post.get("post"),
        total:state.post.get("total")
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        BoardActions: bindActionCreators(boardActions, dispatch),
        
    })  
)(EditPost);