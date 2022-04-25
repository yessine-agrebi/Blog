const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article.js')
const articleRouter = require('./routes/articles.js')
const methodOverride = require('method-override')
const app = express();
// connect the database
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles});
})

app.use('/articles', articleRouter);

app.listen(5000, () => console.log('Server running on port 5000'));