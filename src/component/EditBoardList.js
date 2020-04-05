import React from "react";
import EditBoardItem from "./EditBoardItem";
import _ from  "partial-js";
/* input 컴포넌트 리스트 */
const EditBoardList = ({boards, onChange, onClick, onDelete}) => {
    const boardList = _.map(boards,
        (item, index) => {
            // 데이터 추출
            const { title } = item;
            return(
                <EditBoardItem
                    item={item}
                    key={index}
                    onChange={onChange}
                    onClick={onClick}
                    onDelete={onDelete}
                />
            );
        }
    );
    /*
    const infoList = info.map(
        (item, i) => (
            <SignUp
                key={i}
                title={title[i]}
                index={i}
                name={names[i]}
                type={types[i]}
                {...item}
                onChange={onChange}
                onKeyUp={onKeyUp}
                //onSignup={onSignup}
            />


        )
    );
    */
    return (
        <React.Fragment>
            {boardList}
        </React.Fragment>
    );

};

export default EditBoardList;