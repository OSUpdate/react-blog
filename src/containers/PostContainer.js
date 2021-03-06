import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter, Link} from "react-router-dom";
import * as postActions from "../modules/post";
import * as boardActions from "../modules/board";
import styles from "../App.css";
import PostList from "../component/PostList";
import queryString from "query-string";
import cx from "classnames";
import { List, Map, fromJS } from "immutable";
import {updateHit, setVisit} from "../lib/api";
import _ from "partial-js";

class PostContainer extends Component {
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

    async componentDidMount(){
        _.go(
            setVisit(window.location.href),
            (res)=>{
                const{response}=res.data;
                console.log(response);
                return response;
            }
        );
        const {match,PostActions,location} = this.props;
        const name = this.props.match.params.name?this.props.match.params.name:1;
        const page = queryString.parse(location.search).page?queryString.parse(location.search).page:1;
        name !== "all"?await PostActions.getPosts(name,page):await PostActions.getAllPost(page);
        const totalPage = Math.ceil(this.props.total/this.state.data.get("per"));
        const totalBlock = Math.ceil(totalPage/this.state.data.get("block"));
        const nowBlock = Math.ceil(page/this.state.data.get("block"));
        const next = nowBlock < totalBlock?true:false;
        const prev = nowBlock > 1?true:false;
        console.log(this.props.error);
        this.props.error?history.push("/404"):null;
        this.setState({
            data:this.state.data.set("currentBoard",this.props.match.params.name)
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
    async componentDidUpdate(prevProps, prevState){
        const {PostActions, history} = this.props;
        if((prevProps.match.params.name !== this.props.match.params.name) || 
            queryString.parse(this.props.location.search).page !== queryString.parse(prevProps.location.search).page){
            _.go(
                setVisit(window.location.href),
                (res)=>{
                    const{response}=res.data;
                    return response;
                }
            );
            const page = queryString.parse(this.props.location.search).page?queryString.parse(location.search).page:1;
            const name = this.props.match.params.name?this.props.match.params.name:1;
            name !== "all"?await PostActions.getPosts(name,page):await PostActions.getAllPost(page);
            const totalPage = Math.ceil(this.props.total/this.state.data.get("per"));
            const totalBlock = Math.ceil(totalPage/this.state.data.get("block"));
            const nowBlock = Math.ceil(page/this.state.data.get("block"));
            const next = nowBlock < totalBlock?true:false;
            const prev = nowBlock > 1?true:false;
            console.log(this.props.error);
            this.props.error?history.push("/404"):null;
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
    setPage = () => {
        const {data} = this.state;
        const {match} = this.props;
        let temp = new Array();
        const start = (10*(data.get("nowBlock")-1)+1) <= 1?1:(10*(data.get("nowBlock")-1)+1);
        const end = data.get("nowBlock")*data.get("block") >= data.get("totalPage")?data.get("totalPage"):data.get("nowBlock")*data.get("block");
        const currentPage = queryString.parse(this.props.location.search).page?queryString.parse(this.props.location.search).page:1;
        data.get("prev")?temp.push(<Link key={start-1} to={`/board/${match.params.name}?page=${start-1}`} className={styles.prev+" fas fa-chevron-left"}></Link>):"";
        
        for(let i = start; i<=end;i++){
            temp.push(<Link to={`/board/${match.params.name}?page=${i}`} key={i} className={i===Number(currentPage)?cx(styles.pg_page, styles.current_page):styles.pg_page}>{i}</Link>);
        }
        data.get("next")?temp.push(<Link key={end+1} to={`/board/${match.params.name}?page=${end+1}`} className={styles.next+" fas fa-chevron-right"}></Link>):"";
        return temp;
    }

    handleClick = (e)=>{
        e.preventDefault();
    }
    render(){
        const { data} = this.state;
        const {
            handleClick,
            setPage
        } = this;

        const pages = setPage();
        return(
            
            <section className={styles.contents}>
                <div className={styles.contents_inner}>
            
                    <div className={styles.title}>
                        <Link to={this.props.match.params.name === "all"?"/board/all?page=1":`/board/${data.getIn(["list",0,"bnum"])}?page=1`}>
                            <h2>{this.props.match.params.name === "all"?"전체 게시글":data.getIn(["list",0,"board"])}</h2>
                        </Link>
                    </div>
                    <PostList
                        current={data.get("list").toJS()}
                        
                    />
                    <nav className={styles.pg_wrap}>
                        {pages}
                    </nav>
                </div>

            </section>
        );
    }
}

export default connect(
    (state) => ({
        board:state.board.get("board"),
        post:state.post.get("post"),
        total:state.post.get("total"),
        error:state.post.get("error")
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        BoardActions: bindActionCreators(boardActions, dispatch),
        
    })  
)(withRouter(PostContainer));
