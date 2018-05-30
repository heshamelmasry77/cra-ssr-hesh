import React from 'react';
import { Helmet } from 'react-helmet';

export default () => (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Homepage title</title>
        </Helmet>
        <p>Hi, I'm async.</p>

    </div>
);