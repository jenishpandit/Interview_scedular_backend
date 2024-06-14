import express from "express";
import candidates from '../schemas/candidateSchema.js';

//creating candidate
async function createCandidate(req, res, next)
{
    try{
        let rawData = req.body;
        // if(!rawData) return res.status(400).json({message : "technology_name is null"});       
        let data = await technologies.create(rawData);
        res.status(200).json({message : "data inserted"});
    }catch(err)
    {
        console.log('err',err);
        let errMessage = err;
        if(err.errors.technology_name.message) 
            {
                errMessage = 'please enter technology_name';
            }
        res.status(400).json({message : errMessage});
    }
}

export default createCandidate;