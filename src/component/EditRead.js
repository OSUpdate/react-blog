import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";
import {Editor, convertFromRaw, ContentState, EditorState} from "draft-js";

import * as accountActions from "../modules/account";
import styles from "../App.css";
import cx from "classnames";
import {getReadPost} from "../lib/api";
import _ from "partial-js";

class EditRead extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
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
                    num:data.num,
                    bnum:data.bnum,
                    editorState:EditorState.createWithContent(contentState),
                    board:data.board,
                    time:data.insert,
                    title:data.title,
                    hit:data.hit
                });
            }
        );
    }
    render(){
        const {num, bnum, editorState, board, time, title, hit} = this.state;
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
                                                    <li>테스트</li>
                                                </ul>
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