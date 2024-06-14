import express from "express";
import technologies from "../schemas/technologySchema.js";

//creating technology
async function createTechnology(req, res, next)
{
    try{
        let rawData = req.body;
        if(!rawData) return res.status(400).json({message : "technology_name is null"});       
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
        let rawData = req.body;
        let data = await technologies.findByIdAndDelete(id);
        res.status(200).json({message : "data deleted"});

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

export  {createTechnology, readtechnologies, readtechnology, updatingTechnology, deletingTechnology};