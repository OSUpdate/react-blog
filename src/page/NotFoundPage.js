import React from "react";
import styles from "../App.css";
import {Link} from "react-router-dom";
//import CodeEditor from "../containers/selectApp";
// 에러 페이지
const NotFoundPage = () => {
    return (
        <React.Fragment>
            <div className={styles.full}>
                <div className={styles.error}><h1>404</h1></div>
                <h2>페이지를 찾을 수 없습니다</h2>
                <Link to="/"><button className={styles.btn_xl}>돌아가기</button></Link>
            </div>
        </React.Fragment>
    );
};

export default NotFoundPage;