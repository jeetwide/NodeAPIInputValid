const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
const Helmet = require('helmet');
const Morgan = require('morgan');
const config = require('config');
const courses = require('./routes/courses')
const home = require('./routes/home')


app.use(express.json());
app.use(Helmet());
app.use('/api/courses',courses)
app.use('/',home)


app.set('view engine','pug');
app.set('views','./views');

//Configuration
console.log('Application Name: '+ config.get('name'));
console.log('Mail Server  Name: '+ config.get('mail.host'));
console.log('Mail Server  Password: '+ config.get('mail.password'));



if(app.get('env') === 'development'){
    app.use(Morgan('tiny'));
    console.log('Morgan Enabled...');
}

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));





const port = process.env.port || 3001;

app.listen(port, () => console.log(`listening on port ${port}...`));
