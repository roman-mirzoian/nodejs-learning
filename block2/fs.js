const fs = require('fs');
const { join } = require('path');
const path = require('path');

// file system
// fs.mkdir(path.join(__dirname, 'notes'), err => {
//   if(err) throw new Error(err);

//   console.log('file created');
// });

// fs.writeFile(
//   path.join(__dirname, 'notes', 'mynote.txt'), 
//   'Hello',
//   (err) => {
//     if(err) throw new Error(err);

//     console.log('file created');

//     fs.appendFile(path.join(__dirname, 'notes', 'mynote.txt'),
    
//     '\nfrom Roma',
//     (err) => {
//       if(err) throw err;

//       console.log('file 2 changed');
//     })
//   }
// );

// fs.readFile(
//   path.join(__dirname, 'notes', 'mynote.txt'),
//   'utf-8',
//   (err, data) => {
//     if(err) throw err;

//     console.log(data);
//   }
// );

// fs.rename(
//   path.join(__dirname, 'notes', 'mynote.txt'),
//   path.join(__dirname, 'notes', 'note.txt'),
//   err => {
//     if(err) throw err;

//     console.log('file renamed');
//   }

// );

fs.open(path.join(__dirname, 'notes', 'note.txt'), (err, fd) => {
  if(err) throw err;
  console.log('file opened', fd);
});