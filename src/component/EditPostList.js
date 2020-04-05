import React from "react";
import ErrorInput from "./ErrorInput";
import styles from "../App.css";
import { List, Map } from "immutable";
import cx from "classnames";
/* input 컴포넌트 리스트 */
const EditPostList = ({posts, onChange}) => {
    const PostList = posts.map(
        (item, index) => {
            // 데이터 추출
            console.log(item);
            const { title,time,checked} = item;
            return(
                <li className={cx(styles.scroll_item, styles.setH)} key={index}>
                    <div className={styles.post_item}>
                        <div className={styles.item_checkBox}>
                            <input type="checkbox" id={index} className="checkbox" checked={checked} value={title} onChange={onChange} />
                            <label className={checked?"fas fa-check":""} htmlFor={index}></label>
            
                        </div>
                        <div className={styles.item_title}>
                            <a>{title}</a>
                        </div>
                        <div className={styles.item_time}>
                            <a>{time}</a>
                        </div>
                    </div>
                </li>
            );
        }
    );
    /*
    const infoList = info.map(
        (item, i) => (
            <SignUp
                key={i}
                title={title[i]}
                index={i}
                name={names[i]}
                type={types[i]}
                {...item}
                onChange={onChange}
                onKeyUp={onKeyUp}
                //onSignup={onSignup}
            />


        )
    );
    */
    return (
        <React.Fragment>
            {PostList}
        </React.Fragment>
    );

};

export default EditPostList;