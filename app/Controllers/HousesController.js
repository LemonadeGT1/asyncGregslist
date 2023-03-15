import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawHouses() {
  console.log('drawing houses')
  const houses = appState.houses
  let template = ''
  houses.forEach(house => template += house.HouseCard)
  setHTML('listings', template)
}

export class HousesController {
  constructor() {
    console.log('HousesController constructor')
    appState.on('houses', _drawHouses)
  }

  viewHouses() {
    this.getAllHouses() // getting them instead of just drawing them, because when we switch 'pages' we might not have the data in our appstate to draw
    setHTML('form', House.DynamicHouseForm())
  }


  async getAllHouses() {
    try {
      await housesService.getAllHouses()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async createHouse() {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      await housesService.createHouse(formData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#create-modal').hide()
      // @ts-ignore
      form.reset()
      Pop.toast(`Created Listing for ${formData.bedrooms} ${formData.bathrooms}`, 'success', 'top', 1000)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async deleteHouse(id) {
    try {
      // console.log('deleting', id)
      await housesService.deleteHouse(id)
      Pop.toast('Delete House', 'success', 'bottom')
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  // NOTE this is just handling the pulling up of the editable form
  openEditHouseForm(id) {
    let house = appState.houses.find(house => house.id == id)
    setHTML('edit-form', House.DynamicHouseForm(house))
  }


  async updateHouse(id) {
    try {
      event.preventDefault()
      console.log('update', id)
      const form = event.target
      const editData = getFormData(form)
      console.log(editData)
      await housesService.updateHouse(id, editData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#edit-modal').hide()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }




}
