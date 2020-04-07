import React from "react";
import EditBoardItem from "./EditBoardItem";
import { List, Map } from "immutable";
/* input 컴포넌트 리스트 */
const EditBoardList = ({boards, onChange, onClick, onDelete}) => {
    const boardList = boards.map(
        (item, index) => {
            // 데이터 추출
            console.log(item);
            const { title, update, num } = item.toJS();
            return(
                <EditBoardItem
                    title={title}
                    update={update}
                    num={num} 
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
EditBoardList.defaultProps = {
    list:List(),
};


export default EditBoardList;