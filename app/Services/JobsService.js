import { Job } from "../Models/Job.js"
import { appState } from "../AppState.js"



const sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 5000
})


class JobsService {

  async createJob(formData) {
    // -----------------------------⬇️ endpoint
    // --------------------------------------⬇️ body (our data being sent up)
    const res = await sandbox.post('jobs', formData)
    console.log('[Creating Job]', res.data)
    const newJob = new Job(res.data)
    appState.jobs.push(newJob)
    appState.emit('jobs')
  }

  async deleteJob(id) {
    const res = await sandbox.delete(`jobs/${id}`) // the id of the job we want to delete tells the api which job from jobs has to go
    console.log('[Deleting Job]', res.data)
    appState.jobs = appState.jobs.filter(job => job.id != id)
  }


  async getAllJobs() {
    // const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/jobs')
    const res = await sandbox.get('jobs')
    console.log('[Got All Jobs]', res.data)
    appState.jobs = res.data.map(job => new Job(job))
    console.log(appState.jobs)
  }

  async updateJob(id, editData) {
    const res = await sandbox.put(`jobs/${id}`, editData)
    console.log('[Editing Job]', res.data)

    const updateIndex = appState.jobs.findIndex(car => car.id == id) // gives us position of edited job in the appstate array
    appState.jobs.splice(updateIndex, 1, new Job(res.data)) // splice will remove the job at that index and replace it with the new job
    appState.emit('jobs')
  }


}


export const jobsService = new JobsService()