import express from "express";
import technologies from "../schemas/technologySchema.js";
import candidates from "../schemas/candidateSchema.js";

//creating technology
async function createTechnology(req, res, next)
{
    try{
        let rawData = req.body;
        await technologies.create(rawData);
        res.status(200).json({message : "data inserted"});
    }
    catch(err){
        // console.log("Error : ", err)     
        next(err)
    }
}

//reading technology
async function readtechnologies(req, res, next)
{
    try{
        let data = await technologies.find({});
        res.status(200).json({data : data});

    }catch(err){
        console.log(err);
        res.status(400).json({message : err});
    }
}

//reading technology by id
async function readtechnology(req, res, next)
{
    try{
        let rawData = req.params.id;
        let data = await technologies.findOne({_id : rawData});
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

//updating technology
async function updatingTechnology(req, res, next)
{
    try{
        let id = req.params.id;
        let rawData = req.body;
        let data = await technologies.findByIdAndUpdate(id, rawData);
        res.status(200).json({message : "data updated"});

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

//deleting technology
async function deletingTechnology(req, res, next)
{
    try{
        let id = req.params.id;
        console.log('id',id);
        let isTech = await candidates.findOne({technology_id : id});
        let message = 'data not deleted'
        if(!isTech) 
            {
                await technologies.findByIdAndDelete(id);
                message = 'data deleted';
            }
            res.status(200).json({message : message});
    }
    catch(err){
        console.log(err);
        let errMessage = 'internal server error';
        if (err.kind === "ObjectId") 
            {
                errMessage = 'Invalid ID';
            }
        res.status(400).json({message : errMessage});
    }
}

export  {createTechnology, readtechnologies, readtechnology, updatingTechnology, deletingTechnology};