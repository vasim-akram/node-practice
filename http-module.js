const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const parseUrl = require('url').parse(url, true);
    req.on('error', (err) => {
        console.error(err.stack)
    })
    if (method === 'GET' && parseUrl.pathname === '/user' && !parseUrl.query.id) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 'message': 'GET data' }));
        res.end();
    }
    if (method === 'GET' && parseUrl.pathname === '/user' && parseUrl.query.id) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 'message': `GET data by ${parseUrl.query.id}` }));
        res.end();
    }
    if (method === 'POST' && parseUrl.pathname === '/user') {
        let body = [];
        req.on('data', (data) => {
            body.push(data);
        })
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ 'message': 'POST data', 'data': JSON.parse(body) }));
            res.end();
        })
    }
})

server.listen(3000, () => {
    console.log(`server start at port 3000`);
});

/* 
 API endpoints -
 GET http://127.0.0.1/user
 GET http://127.0.0.1/user?id=20
 POST http://127.0.0.1/user
*/