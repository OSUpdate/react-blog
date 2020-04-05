import React from "react";
import classNames from "classnames";
import styles from "../App.css";

/* input 컴포넌트 */
const ErrorInput = ({num, value, id, type, onChange, title, check, error, onKeyUp}) => {
    return (
        <div className={classNames(styles.item, check ? styles.red : "")}>
            <input className={check ? styles.test : ""} type={type} value={value} onChange={(e)=>onChange(e,num)} onKeyUp={(e)=>onKeyUp(e,num)} placeholder={title}/>
            {check?<p className={styles.error} >{error}</p>:""}
        </div>
    );
};

export default ErrorInput;