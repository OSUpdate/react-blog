import React from "react";
import ErrorInput from "./ErrorInput";
import styles from "../App.css";
import { List, Map } from "immutable";
import cx from "classnames";
/* input 컴포넌트 리스트 */
const EditBoardItem = ({title, update, num ,onChange,onClick,onDelete}) => {

    return(
        <li className={cx(styles.scroll_item, styles.setH)}>
            <div className={styles.post_item}>
                <div className={styles.item_title}>
                    {update?
                        <input type="text" placeholder="제목을 입력하세요" onChange={(e)=>onChange(e, num)} value={title}/>:
                        <a>{title}</a>
                    }
                </div>
                <div className={styles.item_buttons}>
                    {update?
                        <span className={cx(styles.style_button,styles.hover)} onClick={(e)=>onClick(e, num, "확인")}>확인</span>
                        :
                        <span className={cx(styles.style_button,styles.hover)} onClick={(e)=>onClick(e, num, "수정")}>수정</span>
                    }
                    <span className={cx(styles.style_button,styles.hover_red)} onClick={(e)=>onDelete(e, num)}>삭제</span>
                </div>
            </div>
        </li>
    );
};

export default EditBoardItem;