import { dbPostCar, dbGetCars, dbGetBrands, dbGetOneCar } from "../components/dbFunctions.js";
import { logError } from "./errorLogging.js"


async function addCar(req, res) {
    if(checkParams(req, res)){
        try {
            const data = dbPostCar(req)
            return data
        } catch(e) {
            console.log("addCar ", await logError("addCar", e))
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

async function getAllCars(req, res) {
    try {
        const data = await dbGetCars()

        res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.header('Allow', 'GET, HEAD, OPTIONS');

        res.json(data)
    } catch(e) {
        console.log("getAllCars ", await logError("getAllCars", e))
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function getOneCar(req, res) {
    if(await checkParams(req, res)) {
        try {
            const data = await dbGetOneCar(req.query)
            res.json(data)
        } catch(e) {
            console.log("getOneCar ", await logError("getOneCar", e))
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

async function getAllBrands(req, res) {
    try {
        const data = await dbGetBrands()
        res.json(data)
    } catch(e) {
        console.log("getAllBrands ", await logError("getAllBrands", e))
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function checkParams(req, res) {
    if (Object.keys(req.query) == 0) {
        res.status(400).json({ error: "No value given!"})
        return false
    } else {
        return true
    }
};

export {addCar, getAllCars, getAllBrands, getOneCar}