import express from "express";
import candidates from '../schemas/candidateSchema.js';
import fs from 'fs';

//creating candidate
async function createCandidate(req, res, next)
{
    
    try{
        let rawData = req.body.data;
        let requestBody = req.body;
        let image = req.file.path;
        let { first_name, last_name, email, phone_number, technology_id, type  } = requestBody;

        if(!image) return res.status(400).json({message : " is null"});      
        
        let candidateData = {
            first_name, last_name, email, phone_number, technology_id, type ,
            resume: image
        };
        await candidates.create(candidateData);
        res.status(200).json({message : "data inserted"});
    }catch(err)
    {
      next(err)
    }
}

//reading all candidate
async function readCandidates(req, res, next)
{
    try{
        // let data = await candidates.find({});
        let data = await candidates.aggregate([
            {
              $lookup: 
              {
                from: "technologies",
                localField: "technology_id",
                foreignField: "_id",
                as: "tech"
              }
            },
            {
              $addFields: 
              {
                candidate_technology: 
                {
                  "$arrayElemAt" : ["$tech.technology_name",0]
                }
              }
            },
            {
              $project: {
                tech : 0,
                technology_id : 0,
          
              }
            }
          ])
        res.status(200).json({data : data});

    }catch(err){
        console.log(err);
        res.status(400).json({message : err});
    }
}

//reading candidate by id
async function readCandidate(req, res, next)
{
    try{
        let rawData = req.params.id;
        console.log(rawData)
        let data = await candidates.findOne({_id : rawData});
        let resMessage = data; 
        if(!data) resMessage = "invalid id"; 
        console.log(data);
        res.status(200).json({data : resMessage});
    }catch(err){
        console.log('ERROR', err.message);
        let errMessage = 'internal server error';
        if (err.kind === "ObjectId") 
        {
            errMessage = 'Invalid ID';
        }
        res.status(400).json({message : errMessage});
    }
}

//updating candidate
async function updatingCandidate(req, res, next)
{
    try{
        let id = req.params.id;
        let rawData = req.body;
        let data = await candidates.findByIdAndUpdate(id, rawData);
        let resMessage = 'data updated'; 
        if(!data) resMessage = "invalid id"; 
        console.log(data);
        res.status(200).json({data : resMessage});

    }catch(err){
        console.log(err);
        let errMessage = 'internal server error';
        if (err.kind === "ObjectId") 
        {
            errMessage = 'Invalid ID';
        }
        res.status(400).json({message : errMessage});
    }
}

//deleting candidate
async function deletingCandidate(req, res, next)
{
    try{
        let id = req.params.id;
        console.log(id);
        let data = await candidates.findByIdAndDelete(id);
        let resMessage = 'data deleted'; 
        if(!data) resMessage = "invalid id"; 
        console.log(data);
        res.status(200).json({data : resMessage});
    }catch(err){
        console.log(err);
        let errMessage = 'internal server error';
        if (err.kind === "ObjectId") 
            {
                errMessage = 'Invalid ID';
            }
        res.status(400).json({message : errMessage});
    }
}

export {createCandidate, readCandidates, readCandidate, updatingCandidate, deletingCandidate};