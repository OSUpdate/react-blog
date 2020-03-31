import React from "react";
import PostItem from "./PostItem";
import _ from  "partial-js";
import { List, Map } from "immutable";

const PostList = ({current, onClick}) => {
    console.log(current,"test");
    const postList = current.map( 
        (current,index)=>{
            console.log(current,index);
            const {num, time, title, content} = current; 
            return (
                <PostItem
                    key={index}
                    num={num}
                    time={time}
                    title={title}
                    content={content}
                    onClick={onClick}
                />
            );
        });
    return(
        <React.Fragment>
            {postList}
        </React.Fragment>
    );
};
PostList.defaultProps = {
    current: List([
        Map({
            num:1,
            time:"2020-03-31 15:00",
            title:"게시글1",
            content:"내용"
        }),
        Map({
            num:2,
            time:"2020-03-31 16:00",
            title:"게시글2",
            content:"내용"
        }),
        Map({
            num:3,
            time:"2020-03-31 17:00",
            title:"게시글3",
            content:"내용"
        }),
        Map({
            num:4,
            time:"2020-03-31 18:00",
            title:"게시글4",
            content:"내용"
        }),

    ])
};
export default PostList;