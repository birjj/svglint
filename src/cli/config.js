const path = require("path");
const fs = require("fs");

/**
 * Gets the configuration file to use
 * @param {String} filename The filename to look for
 * @param {String} folder The folder to look in
 * @returns {Promise<String,Boolean>} The path to the configuration file, or false
 */
function getConfigurationFile(filename=".svglintrc.js", folder=process.cwd()) {
    const resolved = path.isAbsolute(filename)
        ? filename
        : path.resolve(folder, filename);
    return new Promise((res,rej)=>{
        fs.exists(resolved, exists=>{
            if (exists) {
                // if file exists, finalize
                res(resolved);
            } else {
                const parent = path.resolve(folder, "..");
                if (parent === folder) {
                    return res(false);
                }
                // if not, get next folder
                getConfigurationFile(
                    filename,
                    path.resolve(folder, "..")
                ).then(res).catch(rej);
            }
        });
    });
}

module.exports = {
    getConfigurationFile,
};
