import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import styles from "../App.css";

class PostItem extends Component { 
    render(){
        const {title, content, num, time, onClick} = this.props;
        return(
            <div className={styles.post} onClick={() => onClick(num)}>
                <div className={styles.post_title}>
                    <h3>{title}</h3>
                    <p>{time}</p>
                </div>
            </div>
        );
    }
}
export default withRouter(PostItem);