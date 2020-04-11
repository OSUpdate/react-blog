import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter,Link} from "react-router-dom";

import * as viewActions from "../modules/view";
import styles from "../App.css";
import classNames from "classnames";
import {getReadPost} from "../lib/api";
import _ from  "partial-js";
import {Editor, convertFromRaw, ContentState, EditorState} from "draft-js";
const cx = classNames.bind(styles);

class ReadContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            num:"",
            bnum:"",
            board:"",
            time:"",
            title:"",
            hit:"",
            editorState:EditorState.createEmpty()
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
                        num:data.num,
                        bnum:data.bnum,
                        editorState:EditorState.createWithContent(contentState),
                        board:data.board,
                        time:data.insert,
                        title:data.title,
                        hit:data.hit,
                        next:data.next,
                        prev:data.prev
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
                    num:data.num,
                    bnum:data.bnum,
                    editorState:EditorState.createWithContent(contentState),
                    board:data.board,
                    time:data.insert,
                    title:data.title,
                    hit:data.hit,
                    next:data.next,
                    prev:data.prev
                });
            }
        );
    }
    render(){

        const {handlePostClick} = this;

        const {num, bnum, editorState, board, time, title, hit, next, prev} = this.state;
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
