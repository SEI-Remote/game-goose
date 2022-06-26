import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

router.get('/:id', isLoggedIn, gamesCtrl.show)
router.post('/search', isLoggedIn, gamesCtrl.search)
router.patch("/:id/addToCollection", isLoggedIn, gamesCtrl.addToCollection)
router.patch("/:id/removeFromCollection", isLoggedIn, gamesCtrl.removeFromCollection)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export {
  router
}