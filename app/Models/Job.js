


export class Job {
  constructor(data) {
    this.id = data.id
    this.jobTitle = data.jobTitle
    this.company = data.company
    this.rate = data.rate
    this.hours = data.hours
    this.description = data.description
  }

  get JobCard() {
    return `
    <div class="col-6 col-md-4">
      <div class="bg-light rounded elevation-5">
        <h5 class="p-2 text-center text-dark">${this.jobTitle}</h5>
        <p class="text-warning">Company: ${this.company}</p>
        <p class="text-dark">Description: ${this.description}</p>
        <p class="text-dark">Hours: ${this.hours} -- Rate: ${this.rate}</p>
        <button class="btn btn-danger" onclick="app.jobsController.deleteJob('${this.id}')"> <i
            class="mdi mdi-delete-forever"></i></button>
        <button class="btn btn-warning" onclick="app.jobsController.openEditJobForm('${this.id}')"
          data-bs-toggle="modal" data-bs-target="#edit-modal"><i class="mdi mdi-pen"></i></button>
      </div>
    </div>
    `
  }


  static DynamicJobForm(job = {}) {
    // NOTE because we don't want a bunch of 'undefinded' to show up in our form when we create we have to give the job parameter a default value of '{}'(an empty object). Because empty objects are truthy, our turnery needs to change a little, checking if the 'id' of the job exists
    return ` 
    <form onsubmit="app.jobsController.${job.id ? `updateJob('${job.id}')` : 'createJob()'}" class="row p-4">
      <h3>${job.id ? `Edit ${job.title}` : 'List a job'}</h3>
      <div class="mb-2 col-6">
        <label for="jobTitle">Title</label>
        <input type="text" name="jobTitle" id="jobTitle" class="form-control" value="${job.jobTitle || ''}">
      </div>
      <div class="mb-2 col-6">
        <label for="company">Company</label>
        <input type="text" name="company" id="company" class="form-control" required value="${job.company || ''}">
      </div>
      <div class="mb-2 col-6">
        <label for="rate">Rate</label>
        <input type="number" name="rate" id="rate" class="form-control" required value="${job.rate || 20}">
      </div>
      <div class="mb-2 col-6">
        <label for="hours">Hours</label>
        <input type="number" name="hours" id="hours" class="form-control" required value="${job.hours || 20}">
      </div>
      <div class="mb-2 col-12">
        <label for="description">Description</label>
        <input type="text" name="description" id="description" class="form-control" maxlength="100"  value="${job.description || ''}">
      </div>
      <div class="text-end mt-2">
        <button class="btn" type="button">cancel</button>
        <button class="btn btn-primary" type="submit">submit</button>
      </div>
    </form>
    `
  }


}
