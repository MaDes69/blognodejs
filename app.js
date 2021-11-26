const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');


// -----------------express app-------------------------

const app = express();

//----------------connexion MongoDB----------------------

const dbURI = "mongodb+srv://marion:test123456@cluster0.cse7s.mongodb.net/nodeblog?retryWrites=true&w=majority";


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


//----------------register view engine------------------------

app.set('view engine','ejs');

//----------------listen request ----------------- (envoyer du HTML)

// app.listen(3000);

// app.use((req, res, next) => {  // la fonction next transmet le contrôle à la fonction suivante pour ne pas bloquer la demande 
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next();
// });

//-----------------Middleware and static file--------------------------
app.use(express.static('public')); // joindre un fichier css pour frontend 
app.use(express.urlencoded({ extended: true })); //obtion definir le req.body de la reponse submit( pas obligatoire) 
app.use(morgan('dev'));  // équivalent app.use console.log du dessus


//---------------------Mongoose and mongo sandbox routes  ( differente facon de sauvegarder des données) --------------------
// app.get('/add-blog', (req, res)  => {  // initiation du nouveau blog 
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog',
//     });

//     blog.save()   // nous revoie l'objet sur la base de donnée mango 
//      .then((result) => {
//          res.send(result)
//      })
//      .catch((err) => {
//          console.log(err);
//      });
// });

// app.get('/all-blogs', (req, res) => {  // pour tout les blogs
//     Blog.find()
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {  // choisir un Blog spécifique par ID 
//     Blog.findById('61a09af72e7fca99fd8a2aa8')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });


//---------------------Routes------------------------------------------------

app.get('/', (req, res) => {
    res.redirect('/blogs');
// res.send('<p>JUmanji!</p>'); // équivalent à res.write
   //res.sendFile('./views/index.html', { root: __dirname }); // second parametre objet specifie la racine du projet MANGODB = __dirname le chemin relatif
   //});
//    const blogs = [
//     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//   ];
//   res.render('index', { title: 'Home', blogs });
});

// app.use((req, res, next) => {  // la fonction next transmet le contrôle à la fonction suivante pour ne pas bloquer la demande 
//     console.log('in the new middleware:');
//     next();
// });


app.get('/about', (req, res) => {
    // res.send('<p>About JUmanji!</p>'); // équivalent à res.write
    //res.sendFile('./views/about.html', { root: __dirname });
    //});
    res.render('about', { title: 'About' });
 });

//-----------------------Blog Routes-------------------------------------------

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}) // sort : classemnt des blogs plus recent au vieux
    .then((result) => {
        res.render('index', {title: 'All Blogs',  blogs:result })  //blog result dans index

    })
    .catch((err) => {
        console.log(err);
    })
});


app.post('/blogs', (req, res) => {  // poster nouveau blog
    const blog = new Blog(req.body);

    blog.save() // sauvegarder base de donnée
    .then((result) => {
       res.redirect('/blogs'); 
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/:id', (req, res) => {  // detail du blog selectionné
    const id = req.params.id; // accès au paramètre
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog:result, title: 'Blog Details'});
    })
    .catch((err) => {
        console.log(err);
    })
})

app.delete('/blogs/:id', (req, res) => { // supprimer renvois a l'index de base
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)  // script json dans details.ejs 
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });



//--------------------redirect--------------------------------

// app.get('/about-us', (req, res) => {
//     res.redirect('/about'); // pas besoin de statut code
// });

//------------------------404 page------------------------( mettre a la fin obligatoirement)

app.use((req, res) => {  // utilise cette requete pour toute les demande pas trouvées
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    // });
    res.status(404).render('404', { title: '404' });
});
 


