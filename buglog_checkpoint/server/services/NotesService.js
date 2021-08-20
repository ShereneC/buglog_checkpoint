import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    const res = await dbContext.Notes.create(body)
    // .populate returns it with a creator body on it, so that you can get their name and picture off of it.
    return await dbContext.Notes.findById(res._id).populate('creator', 'name picture')
  }

  async getNotesByBugId(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }

  async destroy(id, userId) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    } else {
      // hmmmm - I had a big question here, but I don't remember what it was.
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
