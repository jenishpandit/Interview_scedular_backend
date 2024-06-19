import notes from '../schemas/noteSchema.js';

//CREATING NOTE
async function createNote( req, res, next) 
{
    try
    {
        let rawData = req.body;
        console.log(rawData);
        let data = await notes.create(rawData);
        res.status(201).json({message : "data inserted"});
    }
    catch(err)
    {
        console.log('ERRoR', err);
        next(err);
    }
}

// reading notes 
async function readNotes(req, res, next)
{
    try{
        let data = await notes.find({});
        res.status(200).json({data : data});
    }
    catch(err){
        console.log('ERRoR', err);
        next(err);
    }
}

//reading note by id
async function readNote(req, res, next)
{
    try{
        let rawData = req.params.id;
        let data = await notes.findOne({_id : rawData});
        let resMessage = data; 
        if(!data) resMessage = "invalid id"; 
        console.log(data);
        res.status(200).json({data : resMessage});
    }
    catch(err)
    {
        console.log('ERROR', err);
        next(err);
    }
}

//updating note by id
async function updateNote(req, res, next)
{
    try{
        let id = req.params.id;
        let rawData = req.body;
        let data = await notes.findByIdAndUpdate(id, rawData);
        res.status(200).json({message : "data updated"});

    }catch(err){
        console.log('ERRoR', err);
        next(err);
    }
}

async function deleteNote(req, res, next)
{
    try{
        let id = req.params.id;
        console.log('id',id);
        let data = await notes.findByIdAndDelete(id);
        res.status(200).json({message : "data deleted"});
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

export {createNote, readNotes, readNote, updateNote, deleteNote};