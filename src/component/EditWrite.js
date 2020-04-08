import React, {Component} from "react";

import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {getBoards, insertPost, updatePost, getPost} from "../lib/api";
import {Line} from "react-chartjs-2";
import "draft-js/dist/Draft.css";
import { List, Map, fromJS } from "immutable";
import * as accountActions from "../modules/account";
import "./style.css";
import styles from "../App.css";
import EditorController from "./EditorController";
import _ from "partial-js";
import cx from "classnames";
import {Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw} from "draft-js";

class EditWrite extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        if(match.params.num){
            this.state = {
                mode: true,
                select:Map(),
                board:List(),
                title:"",
                hasFocus: false,
                editorState: EditorState.createWithContent(ContentState.createFromText(""))
            };
        }
        else{
            this.state = {
                mode: false,
                select:Map(),
                board:List(),
                title:"",
                hasFocus: false,
                editorState: EditorState.createEmpty()
            };
        }
        this.onChange = editorState => this.setState({editorState});
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }
    componentDidMount(){
        this.state.mode?(()=>{
            this.setBoards();
            _.go(
                
                getPost(this.props.match.params.num),
                (res) => {
                    const {response} = res.data;
                    console.log(
                        response
                    );
                    return response.data?response.data:_.stop();
                },
                (data) => {
                    const contentState = convertFromRaw(JSON.parse(data.content));
                    console.log(data);
                    this.setState({
                        title:data.title,
                        select:this.state.select.set("num",data.bnum).set("title",data.board),
                        editorState:EditorState.createWithContent(contentState)
                    });
                },
                _.catch(error=>{
                    console.log(error);
                })
            );
        })():this.setBoards();
    }
    setBoards = () => {
        _.go(
            getBoards(),
            (res) => {
                const {response} = res.data;
                return response.data;
            },
            _.map(item=>Map(item)),
            (list)=>this.setState({
                board:List(list)
            }),
            _.catch(error=>{console.log(error);})
        );
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
    handleChangeSelectBox = (e) => {
        const index = e.nativeEvent.target.selectedIndex;
        this.setState({
            select:this.state.select.set("num",e.target.value).set("title",e.nativeEvent.target[index].text)
        });
    }
    handleTitleChange = (e) =>{
        this.setState({
            title:e.target.value
        });
    }
    _onClick = () => {
        return (e) => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
    }
    handleSubmit = () => {
        const {match} = this.props;
        const {select, title, editorState} = this.state;
        const content = editorState.getCurrentContent();
        this.state.mode?_.go(
            updatePost(match.params.token,select.get("title"),select.get("num"),title,JSON.stringify(convertToRaw(content))),
            (res) => {
                const {response} = res.data;
                return response.data;
            },
            _.catch(error=>{console.log(error);})
        ):
            _.go(
                insertPost(match.params.token,select.get("title"),select.get("num"),title,JSON.stringify(convertToRaw(content))),
                (res) => {
                    const {response} = res.data;
                    return response.data;
                },
                _.catch(error=>{console.log(error);})
            );
    }
    render(){
        const {handleTitleChange, handleChangeSelectBox, handleSubmit} = this;
        const {mode} = this.state;
        const select = this.state.board.map((item,index)=>{
            const {title,orderNo} = item.toJS();
            return (<option key={index} value={orderNo}>{title}</option>);
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
                                            <select value={this.state.select.get("num")} onChange={handleChangeSelectBox}>
                                                {select}
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
                                            <div className={styles.right}>
                                                <button className={styles.btn_l} onClick={handleSubmit}>완료</button>
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