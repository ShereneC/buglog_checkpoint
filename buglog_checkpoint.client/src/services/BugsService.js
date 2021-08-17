import { AppState } from '../AppState'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs(query = {}) {
    const res = await api.get('api/bugs' + convertToQuery(query))
    // I feel like I should be able to put something in here that will trigger the filter if something is selected, but I can't figure it out.
    AppState.bugs = res.data
  }

  // NOTE doing the show functions here is making A LOT of calls to the network - I know there must be a better way!!!
  async showOpen() {
    this.getAllBugs()
    await api.get('api/bugs')
    // AppState.bugs = res.data
    AppState.bugs = AppState.bugs.filter(b => b.closed !== true)
  }

  async showClosed() {
    this.getAllBugs()
    await api.get('api/bugs')
    // AppState.bugs = res.data
    AppState.bugs = AppState.bugs.filter(b => b.closed === true)
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
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

  async editBug(newBug, bugId) {
    const res = await api.put('api/bugs/' + bugId, newBug)
    this.getBugById(bugId)
    this.getNotesByBugId(bugId)
    return res.data.bugId
  }

  async closeBug(bugId) {
    const res = await api.delete('api/bugs/' + bugId)
    // NOTE trying to get it to show on the page after it is closed what if I put..
    this.getBugById(bugId)
    this.getNotesByBugId(bugId)
    return res.data.bugId
  }

  async setActiveBug(id) {
    // Looks like active bug is coming through here
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }
}

export const bugsService = new BugsService()
