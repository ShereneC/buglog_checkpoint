import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getBugById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async getAll() {
    const bugs = await dbContext.Bugs.find().populate('creator', 'name picture')
    return bugs
  }

  async create(body) {
    const res = await dbContext.Bugs.create(body)
    // this returns it with a creator body on it, so that you can get their name and picture off of it.
    return await dbContext.Bugs.findById(res._id).populate('creator', 'name picture')
  }

  async edit(body) {
    // working
    const bug = await dbContext.Bugs.findById(body.id)
    if (!bug.closed) {
      delete body.closed
      const updated = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true })
      return updated
    }
  }

  async delete(body) {
    // cannot get this one working - do we have to manually change the status or should it be coming through on the test?
    // Have to time box -it's been an hour and a half, must move on.  Sent a message in Slack
    const bug = await dbContext.Bugs.findById(body.id)
    if (!bug.closed) {
      const closed = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true })
      return closed
    } else { throw new BadRequest('Bug is Closed!') }
  }
}

export const bugsService = new BugsService()
