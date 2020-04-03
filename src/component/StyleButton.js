import React, {Component} from "react";
import styles from "../App.css";
import cx from "classnames";

class StyleButton extends Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    handleToggle = (e) => {
        e.preventDefault();
        this.setState({
            active:!this.state.active
        });
    }
    render() {
        const { label, style, active } = this.props;
        const { handleToggle } = this;
        return (
            <span className={active? cx(styles.style_button, styles.active):styles.style_button} name={style} onMouseDown={this.onToggle}>
                {label}
            </span>
        );
    }
}
export default StyleButton;