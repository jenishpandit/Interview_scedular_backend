import interview_types from "../schemas/interview_type_schema.js";

//CREATING interviewtype
async function createInterviewType( req, res, next)
{
    try
    {
        let rawData = req.body;
        console.log(rawData);
        let data = await interview_types.create(rawData);
        res.status(201).json({message : "data inserted"});
    }
    catch(err)
    {
        console.log('ERRoR', err);
        next(err);
    }
}

//reading all interviewType 
async function readInterviewsType(req, res, next)
{
    try{
        let data = await interview_types.find({});
        res.status(200).json({data : data});
    }
    catch(err){
        console.log('ERRoR', err);
        next(err);
    }
}

//reading interviewType by id
async function readInterviewType(req, res, next)
{
    try{
        let rawData = req.params.id;
        let data = await interview_types.findOne({_id : rawData});
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

//updating interviewType by id
async function updateInterviewType(req, res, next)
{
    try
    {
        let id = req.params.id;
        let rawData = req.body;
        console.log('id',id,'rd',rawData);
        let data = await interview_types.findByIdAndUpdate(id, rawData);
        res.status(200).json({message : "data updated"});
    }
    catch(err)
    {
        console.log('ERRoR', err);
        next(err);
    }
}

//deleting interviewType by id
async function deleteInterviewType(req, res, next)
{
    try
    {
        let id = req.params.id;
        console.log('id',id);
        let data = await interview_types.findByIdAndDelete(id);
        res.status(200).json({message : "data deleted"});
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
}

export {createInterviewType, readInterviewsType, readInterviewType, updateInterviewType, deleteInterviewType};