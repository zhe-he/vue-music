const express=require('express');
const portfinder = require('portfinder');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const DIST = 'dist';
const opn = require('opn');
const app = express();
const staticPath = path.join(__dirname, '..', DIST, 'static');
// const favicon = path.join(__dirname, '..', DIST, 'favicon.ico');

app.use('/static', express.static(staticPath));
// app.use('/favicon.icon', express.static(favicon));
var apiRoutes = express.Router();
apiRoutes.get('/getDiscList', (req, res) => {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
apiRoutes.get('/lyric', (req, res) => {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        let ret = response.data;
        let re = /^\w+\(({[^()]+})\)$/;
        let match = ret.match(re);
        if (match) {
            ret = JSON.parse(match[1]);
        }
        res.json(ret);
    }).catch(e => {
        console.log(e);
    })
})
apiRoutes.get('/disc', (req, res) => {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data);
    }).catch(e => {
        console.log(e);
    })

});

app.use('/api', apiRoutes);

app.use((req,res) => {
    const file = path.join(__dirname, '..', DIST, 'index.html');
    fs.readFile(file, 'utf-8',(err, content) => {
        if (err) {
            console.log('\x1B[31mPlease execute \x1B[41m\x1B[37m\x1B[1mnpm run build\x1B[0m \x1B[31mfirst\x1B[0m');
            res.status(404).send('We cannot open \'index.html\' file.<br/>Maybe you need to pack it once');
        } else {
            res.set('Content-Type', 'text/html');
            res.send(content);
        }
    });

});
portfinder.getPortPromise().then(port => {
    app.listen(port);
    opn('http://localhost:'+port);
})