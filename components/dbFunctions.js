import { Car, Brand } from './database.js'

async function dbCarPost(params) {
    const query = Car.save
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

export {dbCarPost, dbGetCars, dbGetBrands, dbGetOneCar}
