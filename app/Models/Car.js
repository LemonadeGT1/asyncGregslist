

export class Car {
  constructor(data) {
    this.id = data.id // we dont generate ids this time
    this.make = data.make
    this.model = data.model
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.color = data.color
    this.engineType = data.engineType
  }

  get CarCard() {
    return `
      <div class="col-6 col-md-4">
        <div class="bg-light rounded elevation-5">
          <img class="img-fluid" src="${this.imgUrl}" alt="${this.make} ${this.model}">
          <h5 class="p-2 text-center text-dark">${this.make} | ${this.model} | ${this.year}</h5>
          <p class="text-warning">Avg. Mileage\: ${this.AvgMileage}</p>
          <button class="btn btn-danger" onclick="app.carsController.deleteCar('${this.id}')"> <i class="mdi mdi-delete-forever"></i></button>
          <button class="btn btn-warning" onclick="app.carsController.openEditCarForm('${this.id}')" data-bs-toggle="modal"
          data-bs-target="#edit-modal"><i class="mdi mdi-pen"></i></button>
        </div>
      </div>
      `
  }

  get AvgMileage() {
    return (2035 - this.year) * 30000
  }

  static CarForm() {
    return ` 
  <form onsubmit="app.carsController.createCar()" class="row p-4">
    <h3>List a Car</h3>
    <div class="mb-2 col-4">
      <label for="make">Make</label>
      <input type="text" name="make" id="make" class="form-control">
    </div>
    <div class="mb-2 col-4">
      <label for="model">Model</label>
      <input type="text" name="model" id="model" class="form-control" required minlength="3" maxlength="10"
        placeholder="Toyota">
    </div>
    <div class="mb-2 col-4">
      <label for="year">Year</label>
      <input type="number" name="year" id="year" class="form-control" required min="2020" max="3000"
        value="2023">
    </div>
    <div class="mb-2 col-12">
      <label for="imgUrl">Image URL</label>
      <input type="url" name="imgUrl" id="imgUrl" class="form-control" required
        placeholder="please enter a url for an image...">
    </div>
    <div class="mb-2 col-12">
      <label for="description">Description</label>
      <input type="text" name="description" id="description" class="form-control" maxlength="50">
    </div>
    <div class="mb-2 col-6">
      <label for="color">Color</label>
      <input type="color" name="color" id="color" class="form-control" required value="#4747ff">
    </div>
    <div class="mb-2 col-6">
      <label for="price">Price</label>
      <input type="number" name="price" id="price" class="form-control" required min="1">
    </div>
    <div class="text-end mt-2">
      <button class="btn" type="button">cancel</button>
      <button class="btn btn-primary" type="submit">submit</button>
    </div>
  </form>`
  }

  static EditCarForm(car) {
    return ` 
  <form onsubmit="app.carsController.updateCar('${car.id}')" class="row p-4">
    <h3>Edit ${car.make} ${car.model}</h3>
    <div class="mb-2 col-4">
      <label for="make">Make</label>
      <input type="text" name="make" id="make" class="form-control" value="${car.make}">
    </div>
    <div class="mb-2 col-4">
      <label for="model">Model</label>
      <input type="text" name="model" id="model" class="form-control" required minlength="3" maxlength="10"
        placeholder="Toyota" value="${car.model}">
    </div>
    <div class="mb-2 col-4">
      <label for="year">Year</label>
      <input type="number" name="year" id="year" class="form-control" required min="2020" max="3000"
        value="${car.year}">
    </div>
    <div class="mb-2 col-12">
      <label for="imgUrl">Image URL</label>
      <input type="url" name="imgUrl" id="imgUrl" class="form-control" required
        placeholder="please enter a url for an image..."  value="${car.imgUrl}">
    </div>
    <div class="mb-2 col-12">
      <label for="description">Description</label>
      <input type="text" name="description" id="description" class="form-control" maxlength="50"  value="${car.description}">
    </div>
    <div class="mb-2 col-6">
      <label for="color">Color</label>
      <input type="color" name="color" id="color" class="form-control" required  value="${car.color}">
    </div>
    <div class="mb-2 col-6">
      <label for="price">Price</label>
      <input type="number" name="price" id="price" class="form-control" required min="1"  value="${car.price}">
    </div>
    <div class="text-end mt-2">
      <button class="btn" type="button">cancel</button>
      <button class="btn btn-primary" type="submit">submit</button>
    </div>
  </form>`
  }

  static DynamicCarForm(car = {}) {
    // NOTE because we don't want a bunch of 'undefinded' to show up in our form when we create we have to give the car parameter a default value of '{}'(an empty object). Because empty objects are truthy, our turnery needs to change a little, checking if the 'id' of the car exists
    return ` 
    <form onsubmit="app.carsController.${car.id ? `updateCar('${car.id}')` : 'createCar()'}" class="row p-4">
      <h3>${car.id ? `Edit ${car.make} ${car.model}` : 'List a car'}</h3>
      <div class="mb-2 col-4">
        <label for="make">Make</label>
        <input type="text" name="make" id="make" class="form-control" value="${car.make || ''}">
      </div>
      <div class="mb-2 col-4">
        <label for="model">Model</label>
        <input type="text" name="model" id="model" class="form-control" required minlength="3" maxlength="10"
          placeholder="Toyota" value="${car.model || ''}">
      </div>
      <div class="mb-2 col-4">
        <label for="year">Year</label>
        <input type="number" name="year" id="year" class="form-control" required min="2020" max="3000"
          value="${car.year || 2023}">
      </div>
      <div class="mb-2 col-12">
        <label for="imgUrl">Image URL</label>
        <input type="url" name="imgUrl" id="imgUrl" class="form-control" required
          placeholder="please enter a url for an image..."  value="${car.imgUrl || ''}">
      </div>
      <div class="mb-2 col-12">
        <label for="description">Description</label>
        <input type="text" name="description" id="description" class="form-control" maxlength="50"  value="${car.description || ''}">
      </div>
      <div class="mb-2 col-6">
        <label for="color">Color</label>
        <input type="color" name="color" id="color" class="form-control" required  value="${car.color || '#95f456'}">
      </div>
      <div class="mb-2 col-6">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" class="form-control" required min="1"  value="${car.price || 1}">
      </div>
      <div class="text-end mt-2">
        <button class="btn" type="button">cancel</button>
        <button class="btn btn-primary" type="submit">submit</button>
      </div>
    </form>`
  }

}