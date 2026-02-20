
const fs = require('fs');
const http = require('http');
const url = require('url');
///////////////////////////
// =========== files =============
// ------------ blocking code--------------

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}\nThis is created on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('The file has been written');

//--------------- non blocking code ------------------
// read data from files using syncronanance 
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR 🤯💥');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       // write data :
//       fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, err => {
//         console.log('the file has been written 😊✅');
//       })
//     });
//   });
// });
// console.log('will read file');

///////////////////////////////////////////////////////////////
//============= SERVER ================

// Reading the file inside the request handler is inefficient
// because the file will be read from disk on every request.
// Since this data is static, it's better to read it once when
// the server starts using readFileSync and reuse it.
const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// first we create the server and second we start the server
const server = http.createServer((req, res) => {
  // this the res that we going to send
  // each time we hit the server this function we will called and the callback will have access
  // ==> so here is sending back a simple response to the clint 
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('this is the OVERVIEW page');
  } else if (pathName === '/product') {
    res.end('this is the PRODUCT page');
  } else if (pathName === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    // console.log(data);
    res.end(data);

  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'hello world'
    });
    res.end('<h1>page not found</h1>');

  }
  // res.end('hello from the server');
});
//ip address for localhost
//as a optional we can pass a callback fun which will run as soo as the server start listening
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to request on port 8000');
})

