import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";
import "draft-js/dist/Draft.css";

import * as accountActions from "../modules/account";
import "./style.css";
import styles from "../App.css";
import EditorController from "./EditorController";

import cx from "classnames";
import {Editor, EditorState, RichUtils, ContentState} from "draft-js";

class EditWrite extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        if(match.params.num){
            this.state = {
                mode: true,
                title:"",
                hasFocus: false,
                editorState: EditorState.createWithContent(ContentState.createFromText("test"))
            };
        }
        else{
            this.state = {
                mode: false,
                title:"",
                hasFocus: false,
                editorState: EditorState.createEmpty()
            };
        }
        console.log(this.state.mode);
        this.onChange = editorState => this.setState({editorState});
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    handleTitleChange = (e) =>{
        this.setState({
            title:e.target.value
        });
    }
    _onClick = () => {
        return (e) => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
    }
    getPostData = () => {
        /*
        this.setState({
            editorState:EditorState.createWithContent(ContentState.createFromText("test"))
        });
        */
    }
    render(){
        const {handleTitleChange} = this;
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_12, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.path}>
                                            <select>
                                                <option disabled selected hidden>게시판을 선택해주세요</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </select>
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
                                            <div className={styles.write_head}>
                                                <div className={styles.write_title}>
                                                    <input type="text" placeholder="제목을 입력하세요" name="subject" onChange={handleTitleChange} value={this.state.title}/>
                                                </div>
                                            </div>
                                            <div className={this.state.hasFocus?cx(styles.write_content,styles.hasFocus):styles.write_content}>
                                                <div className={styles.toolbar}>
                                                    <EditorController
                                                        toggleInline={this.toggleInlineStyle}
                                                        toggleBlock={this.toggleBlockType}
                                                        editorState={this.state.editorState}
                                                    />

                                                </div>
                                                <Editor 
                                                    onFocus={() => this.setState({ hasFocus: true })}
                                                    onBlur={() => this.setState({ hasFocus: false })}
                                                    editorState={this.state.editorState} 
                                                    onChange={this.onChange} 
                                                />
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
)(EditWrite);