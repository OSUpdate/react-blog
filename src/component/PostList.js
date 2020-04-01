import React from "react";
import PostItem from "./PostItem";
import _ from  "partial-js";
import { List, Map } from "immutable";

const PostList = ({current, onClick}) => {
    const postList = current.map( 
        (current,index)=>{
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

export default PostList;