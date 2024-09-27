import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            count:0,
        }
    }


    render(){
        return(
            <div className="user-container">
                <h1>{this.props.name}</h1>
                <h2>Count :{this.state.count} </h2>
                <button onClick={()=>{
                    this.setState({count:this.state.count+1})
                }}>Click to Increase</button>
                <h2>Location : Delhi</h2>
                <h2>Contact : @deepanshuranaa</h2>
            </div>
        )
    }
}

export default UserClass;