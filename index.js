'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {Object} A root object where defines all the paths
 * @param {String} A root base path e.g: __dirname.
 */
function defineNodeFoldersPathsOnGlobalObject(mainPath, basePath) {
  fs.readdirSync(getRootPath(basePath))
    .filter(str => str.indexOf('.') !== 0)
    .forEach(dir => {
      /**
       * Check directory has files.
       */
      if (dir.includes('.')) {
        if (fs.lstatSync(`${basePath}/${dir}`).isDirectory()) {
          defineNestedDirectory(mainPath, basePath, dir);
        } else {
          mainPath[dir] = `${basePath}/${dir}`;
        }
      } else {
        defineNestedDirectory(mainPath, basePath, dir);
      }
    });


  function defineNestedDirectory(mainPath, basePath, dir) {
    const isNestedDir = fs.readdirSync(getRootPath(`${basePath}/${dir}`));
    if (isNestedDir.length) {
      mainPath[toCamelCase(dir)] = {};
      mainPath[toCamelCase(dir)]['_'] = `${basePath}/${dir}`
      defineNodeFoldersPathsOnGlobalObject(mainPath[toCamelCase(dir)], getRootPath(`${basePath}/${dir}`));
    }
    else {
      mainPath[toCamelCase(dir)] = { _: `${basePath}/${dir}` }
    }
  }

  function getRootPath(dirPath) {
    return path.resolve(`${dirPath.split('\\').pop()}`)
  }

  function toCamelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (m, chr) {
      return chr.toUpperCase();
    });
  }
}

module.exports = defineNodeFoldersPathsOnGlobalObject;