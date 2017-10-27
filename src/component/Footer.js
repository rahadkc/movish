import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return(
        <div className="app-footer">
            <p><a href='https://www.themoviedb.org/documentation/api' target="_blank"><img className="tmdbImg"src="https://www.themoviedb.org/assets/static_cache/02a9430b88975cae16fcfcc9cf7b5799/images/v4/logos/primary-green.svg"/></a><br/>Project developed using </p>
            Design &amp; Developed by <a href="https://github.com/rahadkc/movish" className="repo">Rahad Rahman</a><a href="https://github.com/rahadkc/movish" className="repo">← Github</a>
        </div>
    )
};

export default Footer;