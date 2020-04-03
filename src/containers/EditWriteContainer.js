import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Line} from "react-chartjs-2";
import "draft-js/dist/Draft.css";

import * as accountActions from "../modules/account";
import "./style.css";
import styles from "../App.css";

import cx from "classnames";
import {Editor, EditorState, RichUtils} from "draft-js";
const BLOCK_TYPES = [
    {label: "H1", style: "header-one"},
    {label: "H2", style: "header-two"},
    {label: "H3", style: "header-three"},
    {label: "H4", style: "header-four"},
    {label: "H5", style: "header-five"},
    {label: "H6", style: "header-six"},
    {label: "Blockquote", style: "blockquote"},
    {label: "UL", style: "unordered-list-item"},
    {label: "OL", style: "ordered-list-item"},
    {label: "Code Block", style: "code-block"},
];
class EditWriteContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false,
            editorState: EditorState.createEmpty()
        };
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
    _onClick = (e) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    render(){
        const btn = ["BOLD", "ITALIC", "UNDERLINE", "CODE"];
        const buttons = btn.map(style => {
            return <button key={style} onClick={this._onClick} name={style}>{style}</button>;
        });
        return(
            <div className={styles.container}>
                <div className={styles.area}>
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={cx(styles.col_lg_12, styles.col_md_12, styles.col_sm_12, styles.col_xs_12)}>
                                <div className={cx(styles.board_card)}>
                                    <div className={styles.none_panel_padding}>
                                        <div className={styles.path}>
                                            <h3>경로</h3>
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
                                                    <input type="text" placeholder="제목을 입력하세요. " name="subject"/>
                                                </div>
                                            </div>
                                            <div className={this.state.hasFocus?cx(styles.write_content,styles.hasFocus):styles.write_content}>
                                                <div className={styles.toolbar}>
                                                    {buttons}
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
)(EditWriteContainer);