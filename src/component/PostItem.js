import React, {Component} from "react";
import {withRouter,Link} from "react-router-dom";
import styles from "../App.css";

class PostItem extends Component { 
    render(){
        const {title, num, time, bnum,hit, onClick} = this.props;
        return(
            <div className={styles.post_content}>
                <Link to={`/board/${bnum}/${num}`} className={styles.post} >
                    <div className={styles.post_title}>
                        <h3>{title}</h3>
                    
                    </div>
                    <div className={styles.post_time}>
                        
                        <p>{time}</p>
                        <p>조회수 {hit}</p>
                    </div>
                </Link>
            </div>
        );
    }
}
export default withRouter(PostItem);