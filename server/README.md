Requires node and npm to be installed on device

npm install
node serve.js

Server will run at http://localhost:8000/
If you want to test in console the api use:


get = async () => { let res = await fetch(`${location.href}/api/todos`, {method: 'GET'}); let resJ = await res.json(); console.log(resJ); }

post = async () => { let res = await fetch(`${location.href}/api/todos`, {method: 'POST', body: JSON.stringify({title: 'Coding in CoffeScript'})}); let resJ = await res.json(); console.log(resJ); }

patch = async () => { let res = await fetch(`${location.href}/api/todos/3`, {method: 'PATCH', body: JSON.stringify({title: 'Coding in JonBellion'})}); let resJ = await res.json(); console.log(resJ);}

getOne = async () => { let res = await fetch(`${location.href}/api/todos/3`, {method: 'GET'}); let resJ = await res.json(); console.log(resJ); }

remove = async () => { let res = await fetch(`${location.href}/api/todos/4`, {method: 'DELETE'}); let resJ = await res.json(); console.log(resJ); }

get();post();get();patch();getOne();remove();