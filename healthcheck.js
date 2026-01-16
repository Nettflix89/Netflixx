// Health check for Render deployment
const http = require('http');

const options = {
    host: '0.0.0.0',
    port: 3000,
    path: '/',
    method: 'GET',
    timeout: 2000
};

const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});

req.on('error', () => {
    process.exit(1);
});

req.end();
