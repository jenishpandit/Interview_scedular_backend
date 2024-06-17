import express from "express";
import candidates from '../schemas/candidateSchema.js';
import fs from 'fs';

//creating candidate
async function createCandidate(req, res, next)
{
    
    try{
        let rawData = req.body.data;
        let requestBody = req.body;
        let data = JSON.parse(requestBody.data);
        let image = req.file.path;
        console.log('image : ',image,'data : ', data);
        if(!image) return res.status(400).json({message : " is null"});      
        console.log('fgh',req.body); // inspect the structure of req.body
        let candidateData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.phone_number,
            technology_id: data.technology_id,
            type: data.type,
            resume: image
        };
          console.log(candidateData)
        let Data = await candidates.create(candidateData);
        console.log('image upload');
        res.status(200).json({message : "data inserted"});
    }catch(err)
    {
        console.log('err',err);
        let errMessage = err;
        if(err) 
            {
                errMessage = err.message;
            }
            console.log(errMessage)
        res.status(400).json({message : errMessage});
    }
}

//reading candidate
async function readCandidates(req, res, next)
{
    try{
        let data = await candidates.find({});
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