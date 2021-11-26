//https://www.youtube.com/watch?v=OIBIXYLJjsI&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=2

const fs = require('fs'); //core module node

// reading files
fs.readFile('./docs/blog.txt', (err, data) => {
  if (err) {
    console.log(err);
  }  
  console.log(data.toString());
});

// console.log('last line');

// writing files
fs.writeFile('./docs/blog.txt', 'hello, world', () => {
  console.log('file was written');
});

fs.writeFile('./docs/blog2.txt', 'hello, again', () => {  //création fichier
  console.log('file was written');
});

// directories
if (!fs.existsSync('./assets')) {   // si leui nom du dossier est différent des dossiers existants 
  fs.mkdir('./assets', err => {   //creation dossier
    if (err) {
      console.log(err);
    }
    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', err => {  //suppression dossier
    if (err) {
      console.log(err);
    }
    console.log('folder deleted');
  });
}

// deleting files
if (fs.existsSync('./docs/deleteme.txt')) {   // le fichier deleteme .txt a été supprimé
  fs.unlink('./docs/deleteme.txt', err => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted');
  });
}