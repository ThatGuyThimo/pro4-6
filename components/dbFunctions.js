import { Car, Brand } from './database.js'

async function dbPostCar(params) {
    const query = Car.insert()
}

async function dbGetCars(params) {
    const query = Car.find(params)
    return query
}

async function dbGetOneCar(params) {
    const query = Car.findOne(params)
    return query
}

async function dbGetBrands(params) {
    const query = Brand.find(params)
    return query
}

export {dbPostCar, dbGetCars, dbGetBrands, dbGetOneCar}
