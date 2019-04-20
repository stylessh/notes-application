const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://stylessh:admindb@cluster0-6hd5v.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
    .then(db => { console.log('DB is connected')})
    .catch(err => {console.error(err)})
