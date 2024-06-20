import interviews from "../schemas/interviewSchema.js";

//CREATING interview
async function createInterview( req, res, next)
{
    try
    {
        let rawData = req.body;
        console.log('rd : ',rawData);
        let data = await interviews.create(rawData);
        res.status(201).json({message : "data inserted"});
    }
    catch(err)
    {
        console.log('ERRoR', err);
        next(err);
    }
}

// reading interviews 
async function readInterviews(req, res, next)
{
    try{
        let data = await interviews.find({});
        res.status(200).json({data : data});
    }
    catch(err){
        console.log('ERRoR', err);
        next(err);
    }
}

//reading interview by id
async function readInterview(req, res, next)
{
    try{
        let rawData = req.params.id;
        let data = await interviews.findOne({_id : rawData});
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

//updating interview by id
async function updateInterview(req, res, next)
{
    try
    {
        let id = req.params.id;
        let rawData = req.body;
        let data = await interviews.findByIdAndUpdate(id, rawData);
        res.status(200).json({message : "data updated"});
    }
    catch(err)
    {
        console.log('ERRoR', err);
        next(err);
    }
}

//deleting interview by id
async function deleteInterview(req, res, next)
{
    try
    {
        let id = req.params.id;
        console.log('id',id);
        let data = await interviews.findByIdAndDelete(id);
        res.status(200).json({message : "data deleted"});
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
}

export {createInterview, readInterviews, readInterview, updateInterview, deleteInterview};