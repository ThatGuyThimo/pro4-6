import { dbPostCar, dbGetCars, dbGetBrands, dbGetOneCar } from "../components/dbFunctions.js";
import { Car, Brand } from '../components/database.js'
import { logError } from "./errorLogging.js"


async function addCar(req, res) {
    try {
        const car = new Car(req.body)

        const validation = car.validateSync()

        if(validation) {
            res.status(400).json({error: 'Parameters must be filled', info: validation.errors})
            return
        }

        const response = dbPostCar(car)

        res.json(response)
    } catch(e) {
        console.log("addCar ", await logError("addCar", e))
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllCars(req, res) {
    try {
        const data = await dbGetCars()
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

function validateObj(obj) {
    return new Promise((resolve, reject) => {
    let index = 0
    console.log(obj)
        Object.values(obj).forEach(value => {
            index++
            if(value == null || value == "" || value == undefined ||  value == 'undefined' || value == "NaN") {
                resolve(false)
            } else if (index === Object.values(obj).length) {
                console.log("ran")
                resolve(true)
            }
        });
    })
  }

export {addCar, getAllCars, getAllBrands, getOneCar}