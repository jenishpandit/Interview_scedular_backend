import express from "express";
import candidates from '../schemas/candidateSchema.js';

//creating candidate
async function createCandidate(req, res, next)
{
    try{
        // let rawData = req.body;
        let image = req.file.path;
        console.log('image : ',image);
        if(!image) return res.status(400).json({message : " is null"});       
        let data = await candidates.create({resume: image});
        console.log('image upload');
        res.status(200).json({message : "data inserted"});
    }catch(err)
    {
        console.log('err',err);
        let errMessage = err;
        if(err) 
            {
                errMessage = 'please enter ';
            }
        res.status(400).json({message : errMessage});
    }
}

export default createCandidate;