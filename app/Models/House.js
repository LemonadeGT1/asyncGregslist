

export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
  }

  get HouseCard() {
    return `
    <div class="col-6 col-md-4">
      <div class="bg-light rounded elevation-5">
        <img class="img-fluid" src="${this.imgUrl}" alt="Beds ${this.bedrooms} Baths ${this.bathrooms}">
        <h5 class="p-2 text-center text-dark">Beds ${this.bedrooms} | Baths ${this.bathrooms} | Levels ${this.levels}</h5>
        <p class="text-warning">Year Built: ${this.year}</p>
        <button class="btn btn-danger" onclick="app.housesController.deleteHouse('${this.id}')"> <i
            class="mdi mdi-delete-forever"></i></button>
        <button class="btn btn-warning" onclick="app.housesController.openEditHouseForm('${this.id}')"
          data-bs-toggle="modal" data-bs-target="#edit-modal"><i class="mdi mdi-pen"></i></button>
      </div>
    </div>
    `
  }

  static DynamicHouseForm(house = {}) {
    // NOTE because we don't want a bunch of 'undefinded' to show up in our form when we create we have to give the house parameter a default value of '{}'(an empty object). Because empty objects are truthy, our turnery needs to change a little, checking if the 'id' of the house exists
    return ` 
    <form onsubmit="app.housesController.${house.id ? `updateHouse('${house.id}')` : 'createHouse()'}" class="row p-4">
      <h3>${house.id ? `Edit ${house.bedrooms} bed ${house.bathrooms} bath` : 'List a house'}</h3>
      <div class="mb-2 col-4">
        <label for="bedrooms">Bedrooms</label>
        <input type="text" name="bedrooms" id="bedrooms" class="form-control" value="${house.bedrooms || '0'}">
      </div>
      <div class="mb-2 col-4">
        <label for="bathrooms">Bathrooms</label>
        <input type="text" name="bathrooms" id="bathrooms" class="form-control" required value="${house.bathrooms || '0'}">
      </div>
      <div class="mb-2 col-4">
        <label for="year">Year</label>
        <input type="number" name="year" id="year" class="form-control" required min="1700" max="3000"
          value="${house.year || 2020}">
      </div>
      <div class="mb-2 col-12">
        <label for="imgUrl">Image URL</label>
        <input type="url" name="imgUrl" id="imgUrl" class="form-control" required
          placeholder="please enter a url for an image..."  value="${house.imgUrl || ''}">
      </div>
      <div class="mb-2 col-12">
        <label for="description">Description</label>
        <input type="text" name="description" id="description" class="form-control" maxlength="100"  value="${house.description || ''}">
      </div>
      <div class="mb-2 col-6">
        <label for="levels">Levels</label>
        <input type="levels" name="levels" id="levels" class="form-control" required  value="${house.levels || '1'}">
      </div>
      <div class="mb-2 col-6">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" class="form-control" required min="1"  value="${house.price || 1}">
      </div>
      <div class="text-end mt-2">
        <button class="btn" type="button">cancel</button>
        <button class="btn btn-primary" type="submit">submit</button>
      </div>
    </form>`
  }

}