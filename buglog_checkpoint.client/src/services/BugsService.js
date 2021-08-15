import { AppState } from '../AppState'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs(query = {}) {
    const res = await api.get('api/bugs' + convertToQuery(query))
    AppState.bugs = res.data
  }

  async getNotesByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes[id] = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    // AppState.activeBug = res.data //  NOTE need to create an active bug
    this.getAllBugs()
    return res.data.id
    // why am I returning the id?  Where does it go?  Copied from Sprintr creatProject
  }

  async closeBug(newBug, bugId) {
    const res = await api.put('api/bugs/' + bugId, newBug)
    return res.data.bugId
  }

  async setActiveBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }
}

export const bugsService = new BugsService()
