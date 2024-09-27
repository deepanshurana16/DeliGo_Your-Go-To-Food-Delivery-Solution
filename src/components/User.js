import React from "react";

const User =(props)=>{
    const {name} = props;
    return(
        <div className="user-container">
            <h1>{name}</h1>
            <h2>Location : Delhi</h2>
            <h2>Contact : @deepanshuranaa</h2>
        </div>
    )
};

export default User;