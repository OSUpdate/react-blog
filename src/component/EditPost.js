import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import { List, Map, fromJS } from "immutable";
import EditPostList from "./EditPostList";
import * as boardActions from "../modules/board";
import * as postActions from "../modules/post";
import styles from "../App.css";
import cx from "classnames";
import _ from  "partial-js";

class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:Map({
                list:List(),
                activeDelete:false,
                currentBoard:this.props.match.params.bname?this.props.match.params.bname:1
            })
            
        };
        /*
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
        */
    }
    async componentDidUpdate(prevProps, prevState){
        const {PostActions} = this.props;
        if(prevProps.match.params.bname !== this.props.match.params.bname){
            await PostActions.getPosts(this.props.match.params.bname);
            this.setState({
                data:this.state.data.set("currentBoard",this.props.match.params.bname).set("list",this.props.post)
            });
        }
            
        return;
    }
    componentDidMount(){
        const {post} = this.props;
        this.setState({
            data:this.state.data.set("list",post)
        });
        /*
        _.go(
            getBoardPost(this.props.match.bname?this.props.match.bname:1),
            (res) => {
                const {response} = res.data;
                return response.data;
            },
            _.map(item=>Map(item)),
            (list)=>this.setState({
                boards:List(list)
            }),
            _.catch(error=>{console.log(error);})
        );
        */
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
                data:data.set("list",list).set("activeDelete", this.handleActiveButton(list))
            })
        );
        
    }
    handleChecked = (e)=>{
        const {data} = this.state;
        this.setState({
            data:data.set("list",List(_.map(data.get("list").toJS(),item => {
                if(item.title === e.target.value)
                    item.checked = !item.checked;
                return Map(item);
            }))).set("activeDelete",this.handleActiveButton(data.get("list")))
        });
    }
    
    setBoard = () => {
        const {match} = this.props;
        return this.props.board.map((board,index)=>{
            const {title,orderNo} = board.toJS();
            return (<li key={index} className={styles.none_item} value={orderNo}><Link to={`/edit/${match.params.token}/board/${orderNo}`}>{title}</Link></li>);
        });
    }
    render(){
        const {data} = this.state;
        const {post} = this.props;
        const {handleChecked,handleAllCheck, setPage, setBoard} = this;
        const pages = setPage(1,10,1);
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
                                            <span className={cx(styles.style_button, styles.hover)}>새로고침</span>
                                            <span className={cx(styles.style_button, styles.hover)} onClick={handleAllCheck}>전체선택</span>
                                            <span className={data.get("activeDelete")?cx(styles.style_button, styles.active_red):styles.style_button}>삭제</span>
                                        </div>
                                        <div className={styles.none_scroll_panel}>
                                            <ul className={styles.scroll_list}>
                                                
                                                <EditPostList
                                                    posts={data.get("list")}
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
        board:state.board.get("board"),
        post:state.post.get("post")
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        BoardActions: bindActionCreators(boardActions, dispatch),
        
    })  
)(EditPost);