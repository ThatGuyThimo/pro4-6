import {
  dbPostCar,
  dbGetCars,
  dbGetBrands,
  dbGetOneCar,
  dbDeleteCar,
  dbPutCar
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

async function editCar(req, res) {
  try {
    req.body._id = req.params._id
    // console.log(req.body)
    const car = new Car(req.body);
    // console.log(car)

    const validation = car.validateSync();

    if (validation) {
      res
        .status(400)
        .json({ error: "Parameters must be filled", info: validation.errors });
      return;
    }

    const delResponse = await dbDeleteCar(req.params);

    if (delResponse.acknowledged && delResponse.deletedCount == 1) {
        const saveResponse = dbPutCar(car);
        res.status(201).json(saveResponse);
    } else {
        res.status(404).json({error: "entry not found"})
    }
  } catch (e) {
    console.log("editCar ", await logError("editCar", e));
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteCar(req, res) {
    if (await checkParams(req, res)) {
        try {

            const result = await dbDeleteCar(req.params)
    
            res.status(204).send(result)
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

    const data = { items: carArray, _links: linkToSelf, pagination: pagination(carArray) };

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

      if(car === null) {
        res.status(404).send("Not found!")
        return
      }
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
        href: `https://thimodehaan.com:8080/cars/details/${car._id}`,
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
    _links: {
        first: {
          href: `https://thimodehaan.com:8080/cars/detail/`,
        },
        last: {
          href: `https://thimodehaan.com:8080/cars/detail/`,
        },
        previous: {
          href: `https://thimodehaan.com:8080/cars/detail/`,
        },
        next: {
          href: `https://thimodehaan.com:8080/cars/detail/`,
        },
      },
  };
}

export { addCar, getAllCars, getAllBrands, getOneCar, deleteCar, editCar };
