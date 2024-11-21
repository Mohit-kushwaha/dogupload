const Dog = require('../models/Dog');
const sharp = require('sharp');
const fs = require('fs');

// Upload a dog picture
exports.uploadDogPicture = async (req, res) =>
{
    try
    {
        const { name } = req.body;

        if (!name || !req.file) return res.status(400).json({ error: 'Name and image are required' });

        // Compress and save image
        const compressedPath = `uploads/compressed-${ name }.jpeg`;
        await sharp(req.file.path)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toFile(compressedPath);

        const dog = new Dog({ name, imageUrl: compressedPath });
        await dog.save();
        res.status(201).json(dog);
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all dog pictures
exports.getAllDogs = async (req, res) =>
{
    try
    {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Fetch a specific dog picture
exports.getDogById = async (req, res) =>
{
    try
    {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });
        res.sendFile(dog.imageUrl, { root: '.' });
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Update a dog picture
exports.updateDogPicture = async (req, res) =>
{
    try
    {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });
        const { name } = req.body
        // Compress and save new image
        const compressedPath = `uploads/compressed-${ name || dog.name }.jpeg`;
        await sharp(req.file.path)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toFile(compressedPath);
        fs.unlinkSync(dog.imageUrl);
        if (name)
        {
            dog.name = name
        }
        dog.imageUrl = compressedPath;
        await dog.save();
        res.json(dog);
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

// Delete a dog picture
exports.deleteDogPicture = async (req, res) =>
{
    try
    {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ error: 'Dog not found' });

        // Delete file and metadata
        fs.unlinkSync(dog.imageUrl);
        await dog.deleteOne();
        res.json({ message: 'Dog image deleted' });
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};
