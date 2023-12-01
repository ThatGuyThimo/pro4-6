import { dbCarPost, dbGetCars, dbGetBrands, dbGetOneCar } from "../components/dbFunctions.js";


async function postCars(req, res) {
    try {
        const data = dbPost()
        return data
    } catch(e) {
        console.error(e)
        res.status(500)
        res.json({ error: 'Internal Server Error' });
    }
}

async function getAllCars(req, res) {
    try {
        const data = await dbGetCars()
        res.json(data)
    } catch(e) {
        console.error(e)
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

export {postCars, getAllCars, getAllBrands, getOneCar}