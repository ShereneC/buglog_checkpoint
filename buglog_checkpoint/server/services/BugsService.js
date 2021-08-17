import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getBugById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async getAll() {
    const bugs = await dbContext.Bugs.find().populate('creator')
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
    } else {
      throw new BadRequest('Cannot be edited - Bug is closed!')
    }
  }

  async delete(id, userId) {
    // cannot get this one working - do we have to manually change the status or should it be coming through on the test?
    // Have to time box -it's been an hour and a half, must move on.  Sent a message in Slack - Mark made some changes here - starting with it should not have been taking in a body - delete's only take in an id.
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug.closed) {
      // Check if that bug is the creator of the logged in user - Mark's notes
      if (userId === bug.creator.id) {
        // const d = new Date(props.project.createdAt)
        // return new Intl.DateTimeFormat('en-US').format(d)

        const closed = await dbContext.Bugs.findByIdAndUpdate(id, { closed: true, closedDate: Intl.DateTimeFormat('en-US').format(new Date(Date.now())), updatedAt: Intl.DateTimeFormat('en-US').format(new Date(Date.now())) }, { new: true })
        // NOTE finds it by id, then sends in the changed object, then which one you want to keep
        return closed
      } else {
        throw new BadRequest('This is not your bug!')
      }
    } else { throw new BadRequest('Bug is Closed!') }
  }
}

export const bugsService = new BugsService()
