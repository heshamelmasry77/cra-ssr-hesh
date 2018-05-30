import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Helmet} from 'react-helmet';
import { StaticRouter } from  'react-router-dom';
import Loadable from 'react-loadable';

// read the manifest file
import manifest from '../../build/asset-manifest.json';

// function to map chunk names to assets
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

// import our main App component
import App from '../../src/App';

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {

    // get the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const modules = [];

        // render the app as a string
        const html = ReactDOMServer.renderToString(
            <StaticRouter location={req.baseUrl}>
                <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                    <App/>
                </Loadable.Capture>
            </StaticRouter>
        );
        const helmet = Helmet.renderStatic();

        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        // now inject the rendered app into our html and send it
        res.send(
            htmlData
                .replace('<title></title>', helmet.title.toString())
                .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                .replace('</body>', extraChunks.join('') + '</body>')
        );
    });
}