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

  async destroy(id) {
    // passing test
    const note = await dbContext.Notes.findByIdAndDelete({ _id: id })
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const notesService = new NotesService()
