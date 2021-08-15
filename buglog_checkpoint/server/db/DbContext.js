import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Bug } from '../models/Bug'
import { Note } from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', Bug);
  // The word schema is optional, but have to put it on the model if you use it.

  Notes = mongoose.model('Note', Note);
}

export const dbContext = new DbContext()
