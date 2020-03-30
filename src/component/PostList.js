import React from "react";
import PostItem from "./PostItem";
import _ from  "partial-js";

const PostList = ({posts, onClick}) => {
    const postList = _.map(posts, 
        (post)=>{
            const {num, time, title, content} = post; 
            return (
                <PostItem
                    key={num}
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