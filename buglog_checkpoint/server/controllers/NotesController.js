import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    // Our tests will check for api up above.
    this.router
      // NOTE  .get('/:id', this.getNotesByBugId) - Don't think I can put this here because it goes to api/bugs/id/notes
      //  Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async create(req, res, next) {
    try {
      // set creator id - do not trust the client to tell me who they are I think this is the only one we need this one - I might need to check on that.
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await notesService.destroy(req.params.id)
      res.send({ message: 'Successfully Deleted' })
    } catch (error) {
      next(error)
    }
  }
}
