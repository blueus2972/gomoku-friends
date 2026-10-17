import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('public',{recursive:true});
for(const file of ['index.html','style.css','app.js','engine.js','friends.svg'])await copyFile(file,`public/${file}`);
console.log('Static site built in public/');
