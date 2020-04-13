import React from "react";
import PostItem from "./PostItem";
import _ from  "partial-js";
import { List, Map } from "immutable";

const PostList = ({current,onClick}) => {
    const postList = current.map( 
        (current,index)=>{
            const {num, insert, title, bnum,hit} = current; 
            return (
                <PostItem
                    key={index}
                    num={num}
                    onClick={onClick}
                    time={insert}
                    title={title}
                    bnum={bnum}
                    hit={hit}
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