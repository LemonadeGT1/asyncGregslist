import { House } from "../Models/House.js"
import { appState } from "../AppState.js"

const sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 5000
})


class HousesService {

  async createHouse(formData) {
    // -----------------------------⬇️ endpoint
    // --------------------------------------⬇️ body (our data being sent up)
    const res = await sandbox.post('houses', formData)
    console.log('[Creating House]', res.data)
    const newHouse = new House(res.data)
    appState.houses.push(newHouse)
    appState.emit('houses')
  }
  async deleteHouse(id) {
    const res = await sandbox.delete(`houses/${id}`) // the id of the house we want to delete tells the api which house from houses has to go
    console.log('[Deleting House]', res.data)
    // this.getAllHouses() // this will update the houses but not the best way to handle it
    appState.houses = appState.houses.filter(house => house.id != id)
  }

  async getAllHouses() {
    // const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/houses')
    const res = await sandbox.get('houses')
    console.log('[Got All Houses]', res.data)
    appState.houses = res.data.map(house => new House(house))
    console.log(appState.houses)
  }

  async updateHouse(id, editData) {
    const res = await sandbox.put(`houses/${id}`, editData)
    console.log('[Editing House]', res.data)

    const updateIndex = appState.houses.findIndex(car => car.id == id) // gives us position of edited house in the appstate array
    appState.houses.splice(updateIndex, 1, new House(res.data)) // splice will remove the house at that index and replace it with the new house
    appState.emit('houses')
  }


}

export const housesService = new HousesService()