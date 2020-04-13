import React from "react";
import PostItem from "./PostItem";
import _ from  "partial-js";
import styles from "../App.css";
import { List, Map } from "immutable";
import Comment from "./Comment";
const CommentList = ({data, onChange, onClick, onSubmit,onModify, onPassword,onClickPassword, onContent, onUpdate, onDelete}) => {
    const commentList = data.map( 
        (item)=>{
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
                passwordInput,
                checkPassword,
                modify
            } = item.toJS(); 
            return (
                <Comment
                    key={index}
                    num={num}
                    post={post}
                    index={index}
                    reply={reply}
                    content={content}
                    insert_date={insert_date}
                    update_date={update_date}
                    nickname={nickname}
                    parent={parent}
                    commentContent={commentContent}
                    commentTitle={commentTitle}
                    commentPassword={commentPassword}
                    group_no={group_no}
                    modify={modify}
                    passwordInput={passwordInput}
                    checkPassword={checkPassword}
                    onClickPassword={onClickPassword}
                    onPassword={onPassword}
                    onChange={onChange}
                    onClick={onClick}
                    onSubmit={onSubmit}
                    onModify={onModify}
                    onContent={onContent}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            );
        });
    return(
        <React.Fragment>
            {commentList}
        </React.Fragment>
    );
};

export default CommentList;