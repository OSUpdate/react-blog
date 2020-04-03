import React, {Component} from "react";
import StyleButton from "./StyleButton";
import styles from "../App.css";
import cx from "classnames";

const inline = [
    {style:"BOLD", label:"Bold"},
    {style:"ITALIC", label:"Italic"},
    {style:"UNDERLINE", label:"Underline"},
    {style:"CODE", label:"Code"}
];
const block = [
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
class EditorController extends Component {
    render() {
        const { editorState, toggleInline, toggleBlock } = this.props;
        const currentStyle = editorState.getCurrentInlineStyle();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(editorState.getSelection().getStartKey())
            .getType();
        const inlineButtons = inline.map(item => {
            return <StyleButton key={item.style} active={currentStyle.has(item.style)} onToggle={toggleInline} style={item.style} label={item.label} />;
        });
        const blockButtons =  block.map(item => {
            return <StyleButton key={item.style} active={item.style === blockType} onToggle={toggleBlock} label={item.label} style={item.style}/>;
        });
        return (
            <React.Fragment>
                {blockButtons}
                {inlineButtons}
            </React.Fragment>
            
            
        );
    }
}
export default EditorController;