const fs = require ('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding : 'utf8'});  //encoding permet de convertir en format lisable ( permet de lire le blog3)
const writeStream = fs.createWriteStream('./docs/blog4.txt')   // permet d'écrire les données du blog3 dans le blog4 sans terminal

 readStream.on('data', (chunk) => {  //readStream.on est un ecouteur d'événement /  a chaque fois qu'une chunk de données est terminée on refais un access a la chunk de donnée suivante
 console.log('------ NEW CHUNK ------');  // donne les données des différentes chunk de donnée
//  console.log(chunk.toString());  // donne le contenu ecris des chunks
 console.log(chunk);

 writeStream.write('\nNEW CHUNK\n'); // \n sauter une ligne
 writeStream.write(chunk);
}); 


//piping 

// readStream.pipe(writeStream);  version plus rapide qui permet de transferer du read au write en une ligne de code ( equivalent ligne 6 à 13) sans la distinction ------ NEW CHUNK ------




