import {
  dbPostCar,
  dbGetCars,
  dbGetBrands,
  dbGetOneCar,
  dbDeleteCar,
} from "../components/dbFunctions.js";
import { Car, Brand } from "../components/database.js";
import { logError } from "./errorLogging.js";

async function addCar(req, res) {
  try {
    const car = new Car(req.body);

    const validation = car.validateSync();

    if (validation) {
      res
        .status(400)
        .json({ error: "Parameters must be filled", info: validation.errors });
      return;
    }

    const response = dbPostCar(car);

    res.status(201).json(response);
  } catch (e) {
    console.log("addCar ", await logError("addCar", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteCar(req, res) {
    if (await checkParams(req, res)) {
        try {

            const result = await dbDeleteCar(req.params)
    
            res.send(result)
        } catch(e) {
            console.log("deleteCar ", await logError("deleteCar", e));
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
} 

async function getAllCars(req, res) {
  try {
    const cars = await dbGetCars();

    let carArray = [];

    cars.forEach((car) => {
      carArray.push(links(car));
    });

    const linkToSelf = {self: {
        href: 'https://thimodehaan.com:8080/cars'
    }}

    const data = { items: carArray,_link: linkToSelf, pagination: pagination(carArray) };

    res.json(data);
  } catch (e) {
    console.log("getAllCars ", await logError("getAllCars", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOneCar(req, res) {
  if (await checkParams(req, res)) {
    try {
      let car = await dbGetOneCar(req.params);
      const data = links(car);

      res.json(data);
    } catch (e) {
      console.log("getOneCar ", await logError("getOneCar", e));
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

async function getAllBrands(req, res) {
  try {
    const data = await dbGetBrands();
    res.json(data);
  } catch (e) {
    console.log("getAllBrands ", await logError("getAllBrands", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function checkParams(req, res) {
  if (Object.keys(req.query) == 0 && Object.keys(req.params) == 0) {
    res.status(400).json({ error: "No value given!" });
    return false;
  } else {
    return true;
  }
}

function links(car) {
  return {
    ...car.toObject(),
    _links: {
      self: {
        href: `https://thimodehaan.com:8080/cars/${car._id}`,
      },
      collection: {
        href: `https://thimodehaan.com:8080/cars`,
      },
    },
  };
}

function pagination(obj) {
  return {
    currentPage: 1,
    currentItems: obj.length,
    totalPages: 1,
    totalItems: obj.length,
    // _links: {
    //     first: {
    //       href: `https://thimodehaan.com:8080/cars/detail/`,
    //     },
    //     last: {
    //       href: `https://thimodehaan.com:8080/cars/detail/`,
    //     },
    //     previous: {
    //       href: `https://thimodehaan.com:8080/cars/detail/`,
    //     },
    //     next: {
    //       href: `https://thimodehaan.com:8080/cars/detail/`,
    //     },
    //   },
  };
}

export { addCar, getAllCars, getAllBrands, getOneCar, deleteCar };
