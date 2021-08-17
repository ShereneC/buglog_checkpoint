import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    // Our tests will check for api up above.
    this.router
      .get('', this.getAll)
      .get('/:id', this.getBugById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:id/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    // used recipiesController as model
    // working
    try {
      const bugs = await bugsService.getAll()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    // working
    try {
      const bug = await bugsService.getBugById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    // create is passing
    try {
      // set creator id - do not trust the client to tell me who they are I think this is the only one we need this one - I might need to check on that.
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const bug = await notesService.getNotesByBugId({ bugId: req.params.id })
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const bug = await bugsService.edit(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const bug = await bugsService.delete(req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
