import React from "react";
import styles from "../App.css";

/* input 컴포넌트 */
const SignIn = ({value, id, type, title, onChange}) => {
    return (
        <div className={styles.item}>
            <input type={type} name={id} value={value} onChange={onChange} placeholder={title}/>
        </div>
    );
};

export default SignIn;