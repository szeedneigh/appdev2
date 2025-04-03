const url = require('url');

const myUrl = 'http://www.example.com:8080/pathname?name=JohnDoe#fragment';

const parsedUrl = url.parse(myUrl, true);

console.log('Parsed URL Object:');
console.log(parsedUrl);

console.log('\nName parameter value:');
console.log(parsedUrl.query.name);
