const fs = require('fs')
const axios = require('axios')

function validURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

if (validURL(process.argv[2])) {
    const url = process.argv[2];
    webCat(url);
} else {
    const file = process.argv[2];
    cat(file);
}

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`file contents: , ${data}`);
    })
}

function webCat(url) {
    axios.get(url)
        .then(function (resp) {
            console.log(`url content: , ${resp.data}`);
        })
        .catch(function (err) {
            console.log(err);
            process.exit(1);
        })
}