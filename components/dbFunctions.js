import { Car, Brand } from './database.js'

async function dbPostCar(car) {
    const query = car.save()
    // console.log(params)
    return query
}

async function dbDeleteCar(car) {
    const query = Car.deleteOne(car)
    // console.log(params)
    return query
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

export {dbPostCar, dbGetCars, dbGetBrands, dbGetOneCar, dbDeleteCar}
