const fs = require('fs')
const File = require('../models/File')
const config = require('config')

class FileService {

    createDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file);
        
        if (!fs.existsSync(path)) {
            console.error(`File or folder was not found: ${path}`);
            return;
        }
    
        try {
            const stats = fs.statSync(path);
            
            if (stats.isDirectory()) {
                fs.rmSync(path, { recursive: true, force: true });
                console.log(`Folder deleted: ${path}`);
            } else if (stats.isFile()) {
                fs.unlinkSync(path);
                console.log(`File deleted: ${path}`);
            } else {
                console.error(`Unknown type of file: ${path}`);
            }
        } catch (err) {
            console.error(`Delete error: ${err.message}`);
        }
    }

    getPath(file) {
        return config.get('filePath') + '\\' + file.user + '\\' + file.path
    }
}

module.exports = new FileService()