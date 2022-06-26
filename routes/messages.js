import { Router } from 'express'
import * as messagesCtrl from "../controllers/messages.js"

const router = Router()

router.get('/', isLoggedIn, messagesCtrl.index)
router.get('/:id', isLoggedIn, messagesCtrl.show)
router.post('/', isLoggedIn, messagesCtrl.create)
router.post('/:id', isLoggedIn, messagesCtrl.reply)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export {
  router
}