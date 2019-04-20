const { Router } = require('express');
const router = Router();
const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res)=> {
    res.render('notes/new-note')
});

router.post('/notes/new-note', isAuthenticated, async (req, res)=> {
    const { title, description } = req.body;
    const errors = [];

    if(title.length <= 0) {
        errors.push({text: 'Write a title'});
        res.render('notes/new-note', {errors, title, description});
    } else if (description.length <= 0) {
        errors.push({text: 'Write a description'});
        res.render('notes/new-note', {errors, title, description});
    } else {
        
        const newNote = new Note({
            title,
            description
        });

        newNote.user = req.user.id;
        
        await newNote.save();
        req.flash('success_msg', 'Note Added Succesfully!');
        res.redirect('/notes');

    }
});

router.get('/notes', isAuthenticated, async (req, res)=> {
    
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', {
        notes
    });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res)=> {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {
        note
    });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res)=> {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});

    req.flash('success_msg', 'Note Update Successfully!');

    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res)=> {
    await Note.findByIdAndDelete(req.params.id);
    
    req.flash('success_msg', 'Note Delete Successfully!');
    res.redirect('/notes');
});

module.exports = router;