import { Game } from '../models/game.js'
import { GameReview } from '../models/gameReview.js'

function create(req, res) {
  req.body.author = req.user.profile._id
  req.body.game = req.params.id
  GameReview.create(req.body)
  .then((review) => {
    Game.findById(req.params.id)
    .then((game) => {
      game.reviews.push(review._id)
      game.save()
      .then(()=> {
        res.redirect(`/games/${game.rawgId}`)
      })
    })
  })
}

export { create }