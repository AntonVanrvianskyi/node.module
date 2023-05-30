const fs = require('fs');
const path = require('path')
// fs.mkdir(path.join(__dirname, 'test'),(err)=>{
//     if (err) throw new Error(err.message)
// })
// const data = 'This is a file containing a collection of movies'
// for (let i = 1; i<6; i++){
//     fs.mkdir(path.join(__dirname,'test',`test${i}`),(err)=>{
//         if (err) throw new Error(err.message)
//     })
//     fs.writeFile(path.join(__dirname,'test',`file${i}.txt`),data, (err)=>{
//         if (err) throw new Error(err.message)
//     })
// }
fs.readdir(path.join(__dirname,'test'),{withFileTypes:true},(err, files)=>{
    if (err) throw new Error(err.message)
    files.forEach(value => console.log(value.isFile()?`File:${value.name}`:`Folder:${value.name}`))
})