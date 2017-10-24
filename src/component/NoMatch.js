import React from 'react';
import '../Error.css';

const NoMatch = ({location}) => {
    return(
        <div>
            <div className="error">404</div>
            <br /><br />
            <span className="info"><b>{location}</b> Sorry, there is nothing in this link!</span>
            <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" className="static" />
        </div>
    )
};

export default NoMatch;