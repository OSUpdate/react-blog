import React from "react";
import styles from "../App.css";
//import { format, setGlobalDateMasks } from "fecha";
import cx from "classnames";
/*
setGlobalDateMasks({
    myMask: 'HH:mm:ss YY/MM/DD';
  });
*/
/* input 컴포넌트 리스트 */
const EditPostList = ({posts, onChange}) => {
    const PostList = posts.map(
        (item, index) => {
            // 데이터 추출
            const { title,num,insert,checked} = item.toJS();
            return(
                <li className={cx(styles.scroll_item, styles.setH)} key={index}>
                    <div className={styles.post_item}>
                        <div className={styles.item_checkBox}>
                            <input type="checkbox" id={index} className="checkbox" checked={checked} value={title} onChange={(e)=>onChange(e,num)} />
                            <label className={checked?"fas fa-check":""} htmlFor={index}></label>
            
                        </div>
                        <div className={styles.item_title}>
                            <a>{title}</a>
                        </div>
                        <div className={styles.item_time}>
                            <a>{insert}</a>
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