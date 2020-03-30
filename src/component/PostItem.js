import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import styles from "../App.css";

class PostItem extends Component { 
    render(){
        const {title, content, num, time, onClick} = this.props;
        return(
            <div className={styles.post} onClick={(e)=>onClick(e,num)}>
                <h3>{title}</h3>
                <div className={styles.content}>
                    <p>{content}</p>
                </div>
            </div>
        );
    }
}
export default withRouter(PostItem);