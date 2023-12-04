import * as fs from 'fs';
import 'dotenv/config';
const dir = process.env.LOGGINGDIR
import path from "path"


/**
 * Creates error loging dir.
 */
async function _createloggingFolder() {
    return new Promise((resolve, reject) =>{
        fs.mkdirSync(path.join(dir, "errorLogs"), { recursive: true }, function (error) {
            if (error) {
                console.log(error)
                reject(error)
            }
        })
        resolve(true)
    })
}

/**
 * 
 * @param {error} value error
 * @returns string (file name)
 */
async function logError(value) {
    return new Promise(async function (resolve, reject) {        
        let date = new Date
        let fileName = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-h${date.getHours()}-m${date.getMinutes()}-s${date.getSeconds()}`
        if (await _createloggingFolder()) {
            fs.open(`${dir}errorLogs/${fileName}.txt`, 'w', function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
            })
            fs.writeFile(`${dir}errorLogs/${fileName}.txt`, `${value}`, function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
                resolve(fileName)
            })
        }
    })
}

export {logError}