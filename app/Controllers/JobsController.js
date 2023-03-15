import { appState } from "../AppState.js"
import { jobsService } from "../Services/JobsService.js"
import { Job } from "../Models/Job.js"
import { setHTML } from "../Utils/Writer.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"

function _drawJobs() {
  console.log('_drawJobs')
  const jobs = appState.jobs
  let template = ''
  jobs.forEach(job => template += job.JobCard)
  setHTML('listings', template)
}


export class JobsController {
  constructor() {
    console.log('JobsController constructor')
    appState.on('jobs', _drawJobs)
  }

  viewJobs() {
    this.getAllJobs() // getting them instead of just drawing them, because when we switch 'pages' we might not have the data in our appstate to draw
    setHTML('form', Job.DynamicJobForm())
  }

  async getAllJobs() {
    try {
      await jobsService.getAllJobs()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }


  async createJob() {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      await jobsService.createJob(formData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#create-modal').hide()
      // @ts-ignore
      form.reset()
      Pop.toast(`Created Listing for ${formData.jobTitle}`, 'success', 'top', 1000)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async deleteJob(id) {
    try {
      // console.log('deleting', id)
      await jobsService.deleteJob(id)
      Pop.toast('Delete Job', 'success', 'bottom')
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  // NOTE this is just handling the pulling up of the editable form
  openEditJobForm(id) {
    let job = appState.jobs.find(job => job.id == id)
    setHTML('edit-form', Job.DynamicJobForm(job))
  }


  async updateJob(id) {
    try {
      event.preventDefault()
      console.log('update', id)
      const form = event.target
      const editData = getFormData(form)
      console.log(editData)
      await jobsService.updateJob(id, editData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#edit-modal').hide()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }


}