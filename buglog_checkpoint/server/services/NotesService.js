import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    // create notes passing
    const res = await dbContext.Notes.create(body)
    // this returns it with a creator body on it, so that you can get their name and picture off of it.
    return await dbContext.Notes.findById(res._id).populate('creator', 'name picture')
  }

  async getNotesByBugId(query = {}) {
    // NOTE not passing tests - is this in the right place?
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }

  async destroy(id, userId) {
    // passing test
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    } else {
      // hmmmm
      if (userId === note.creator.id) {
        const toDie = await dbContext.Notes.findByIdAndDelete({ _id: id })
        return toDie
      } else {
        throw new BadRequest('Not Allowed for this user')
      }
    }
  }
}

export const notesService = new NotesService()
