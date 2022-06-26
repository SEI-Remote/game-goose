import { Game } from '../models/game.js'
import { Profile } from '../models/profile.js'
import { GameReview } from '../models/gameReview.js'
import { Message } from '../models/message.js'

function index(req, res) {
  Game.find({})
  .sort({_id: -1})
  .limit(6)
  .populate('collectedBy')
  .then(games => {
    Profile.find({})
    .sort({_id: -1})
    .limit(5)
    .then(profiles => {
      GameReview.find({})
      .sort({_id: -1})
      .limit(6)
      .populate('game')
      .populate('author')
      .then(reviews => {
        Message.find({})
        .sort({_id: -1})
        .limit(6)
        .populate('author')
        .then(messages => {
          console.log(games)
          res.render('index', {
            games,
            profiles,
            reviews,
            messages,
            title: 'Latest Activity'
          })
        })
      })
    })
  })
}

export {
  index,
}