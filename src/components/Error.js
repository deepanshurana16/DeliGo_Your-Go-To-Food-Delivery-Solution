import React from "react";
import {useRouteError} from "react-router-dom";

const Error =()=>{
    const err = useRouteError();
    console.log(err);
    return(
        <div className="error-cont">
        <h2>Unexpected Application Error! by Deepanshu Rana</h2>
        <h4>{err.status} {err.statusText}</h4>
        <p>💿 Hey developer 👋</p>
        <p>You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.</p>
        </div>
    )
};

export default Error;