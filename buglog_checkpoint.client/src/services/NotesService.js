
import { api } from './AxiosService'
import { bugsService } from './BugsService'

class NotesService {
  async createNote(newNote) {
    const res = await api.post('api/notes', newNote)
    bugsService.getNotesByBugId(res.data.bugId)
    // NOTE do I need to return res.data.id
    // return res.data.id
  }

  async deleteNote(noteId, bugId) {
    await api.delete('api/notes/' + noteId)
    bugsService.getNotesByBugId(bugId)
  }

  // async editTask(newTask, taskId) {
  //   const res = await api.put('api/tasks/' + taskId, newTask)
  //   return res.data.sprintId
  // }

  // countWeight(tasks) {
  //   let weight = 0
  //   tasks.forEach(t => {
  //     weight += t.weight
  //   })
  //   return weight
  // }
}

export const notesService = new NotesService()
