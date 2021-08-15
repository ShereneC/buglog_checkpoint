import { AppState } from '../AppState'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs(query = {}) {
    const res = await api.get('api/bugs' + convertToQuery(query))
    AppState.bugs = res.data
  }

  async closeBug(newBug, bugId) {
    const res = await api.put('api/bugs/' + bugId, newBug)
    return res.data.bugId
  }
}

export const bugsService = new BugsService()
