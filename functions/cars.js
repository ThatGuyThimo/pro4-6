import { dbPostCar, dbGetCars, dbGetBrands, dbGetOneCar } from "../components/dbFunctions.js";
import { logError } from "./errorLogging.js"


async function addCar(req, res) {
    if(checkParams(req, res)){
        try {
            // const data = dbPostCar(req)
            await logError("addCar")
            return "kaas"
        } catch(e) {
            console.log("addCar ", await logError(e))
            res.status(500)
            res.json({ error: 'Internal Server Error' });
        }
    }
}

async function getAllCars(req, res) {
    try {
        const data = await dbGetCars()
        res.json(data)
    } catch(e) {
        await logError(e)
        res.status(500)
        res.json({ error: 'Internal Server Error' });
    }
};

async function getOneCar(req, res) {
    if(await checkParams(req, res)) {
        try {
            const data = await dbGetOneCar(req.query)
            res.json(data)
        } catch(e) {
            console.error(e)
            res.status(500)
            res.json({ error: 'Internal Server Error' });
        }
    }
};

async function getAllBrands(req, res) {
    try {
        const data = await dbGetBrands()
        res.json(data)
    } catch(e) {
        console.error(e)
        res.status(500)
        res.json({ error: 'Internal Server Error' });
    }
};

async function checkParams(req, res) {
    if (Object.keys(req.query) == 0) {
        res.statusCode = 400;
        res.json({ error: "No value given!"})
        return false
    } else {
        return true
    }
};

export {addCar, getAllCars, getAllBrands, getOneCar}