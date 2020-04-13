import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import cx from "classnames";
import styles from "../App.css";

class PostItem extends Component { 
    render(){
        const {
            num,
            post,
            index,
            reply,
            content,
            insert_date,
            update_date,
            nickname,
            parent,
            commentContent,
            commentTitle,
            commentPassword,
            group_no,
            modify,
            checkPassword,
            passwordInput,
            onModify,
            onChange,
            onClick,
            onSubmit,
            onPassword,
            onClickPassword,
            onContent,
            onDelete,
            onUpdate
        } = this.props;
        return(
            <li className={styles.comment_item}>
                {!parent?
                    <React.Fragment key={index}>
                        <div className={styles.comment_title}>
                            <span className={styles.comment_nick}>{nickname}</span>
                            <span className={styles.comment_time}>{insert_date}</span>
                            {modify?
                                <React.Fragment>
                                    <span className={styles.comment_password}><input type="text" placeholder="비밀번호" value={passwordInput} onChange={(e)=>onPassword(e,index)}></input></span>
                                    <span className={styles.comment_password_btn} onClick={(e)=>onClickPassword(e,index,num)}>확인</span>
                                </React.Fragment>
                                :""}
                            <span className={styles.right_float} onClick={(e)=>onModify(e, index)}>수정/삭제</span>
                            <span className={styles.right_float} onClick={(e)=>onClick(e,index)}>댓글작성</span>
                        </div>
                        <div className={styles.comment_content}>
                            {!checkPassword?
                                <p>{content}</p>
                                :<textarea rows="4" name="commentContent" value={content} onChange={(e)=>onContent(e,index)} placeholder="내용"></textarea>}
                        </div>
                        {!checkPassword?""
                            :<div className={styles.comment_submit}>
                                <button className={styles.btn_l} onClick={(e)=>onUpdate(e,index,num)}>수정</button>
                                <button className={cx(styles.btn_l,styles.red_btn)} onClick={(e)=>onDelete(e,num)}>삭제</button>
                            </div>
                        }
                        {reply?
                            <div className={styles.write_comment}>
                                <div className={styles.write_comment_title}>
                                    <input type="text" name="commentTitle" onChange={(e)=>onChange(e,index)} value={commentTitle} placeholder="닉네임"></input>
                                    <input type="text" name="commentPassword" onChange={(e)=>onChange(e,index)} value={commentPassword} placeholder="비밀번호"></input>
                                </div>
                                <div className={styles.write_comment_content}>
                                    <textarea rows="4" name="commentContent" onChange={(e)=>onChange(e,index)} value={commentContent} placeholder="내용"></textarea>
                                </div>
                                <div className={styles.comment_submit}>
                                    <button className={styles.btn_l} onClick={(e)=>onSubmit(e,index,num, group_no)}>확인</button>
                                </div>
                            </div>
                            :""}
                    </React.Fragment>
                    :
                    <ul>
                        <li className={styles.comment_item}>
                            <div className={styles.comment_title}>
                                <span className={styles.comment_nick}>{nickname}</span>
                                <span className={styles.comment_time}>{insert_date}</span>
                                {modify?
                                    <React.Fragment>
                                        <span className={styles.comment_password}><input type="text" placeholder="비밀번호" value={passwordInput} onChange={(e)=>onPassword(e,index)}></input></span>
                                        <span className={styles.comment_password_btn} onClick={(e)=>onClickPassword(e,index,num)}>확인</span>
                                    </React.Fragment>
                                    :""}
                                <span className={styles.right_float} onClick={(e)=>onModify(e, index)}>수정/삭제</span>
                                <span className={styles.right_float} onClick={(e)=>onClick(e,index)}>댓글작성</span>
                            </div>
                            <div className={styles.comment_content}>
                                {!checkPassword?
                                    <p>{content}</p>
                                    :<textarea rows="4" name="commentContent" value={content} onChange={(e)=>onContent(e,index)} placeholder="내용"></textarea>}
                            </div>
                            {!checkPassword?""
                                :<div className={styles.comment_submit}>
                                    <button className={styles.btn_l} onClick={(e)=>onUpdate(e,index,num)}>수정</button>
                                    <button className={cx(styles.btn_l,styles.red_btn)} onClick={(e)=>onDelete(e,num)}>삭제</button>
                                </div>
                            }
                            {reply?
                                <div className={styles.write_comment}>
                                    <div className={styles.write_comment_title}>
                                        <input type="text" name="commentTitle" onChange={(e)=>onChange(e,index)} value={commentTitle} placeholder="닉네임"></input>
                                        <input type="text" name="commentPassword" onChange={(e)=>onChange(e,index)} value={commentPassword} placeholder="비밀번호"></input>
                                    </div>
                                    <div className={styles.write_comment_content}>
                                        <textarea rows="4" name="commentContent" onChange={(e)=>onChange(e,index)}value={commentContent} placeholder="내용"></textarea>
                                    </div>
                                    <div className={styles.comment_submit}>
                                        <button className={styles.btn_l} onClick={(e)=>onSubmit(e,index,parent, group_no)}>확인</button>
                                    </div>
                                </div>
                                :""}
                        </li>
                    </ul>
                }
            </li>
        );
    }
}
export default withRouter(PostItem);