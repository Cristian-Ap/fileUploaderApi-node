const { response, request } = require("express");
const extensions_allowed = require('../models/str-freeze/file-extension');

const uploadFile = (req = request, res = response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).josn({
                message: "file is required"
            });
        }
    
        const file = req.files.image;
        const path = 'uploads/'+file.name;

        if(!Object.values(extensions_allowed).includes(file.mimetype)){
            res.status(400).json({
                message: "file extensión invalid"
            })
            return;
        };

        file.mv(path, function(err) {
            if (err) return res.status(500).send(err);
            res.status(200).json({ message: 'File upload succesffuly'});
        });
        return;
        
    } catch (error) {
        res.status(400).json({
            message: "Error while uploading the file",
            error: error
        })
    }
}

module.exports = {
    uploadFile
};