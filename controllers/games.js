import { Game } from '../models/game.js'
import { GameReview } from '../models/gameReview.js'

import axios from 'axios'

function search(req, res) {
  axios.get(`https://api.rawg.io/api/games?page_size=10&search=${req.body.search}&key=${process.env.API_KEY}`)
  .then((response) => {
    res.render("games/results", {
      title: "Search Results",
      results: response.data.results,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  axios
  .get(`https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`)
  .then((response) => {
    Game.findOne({ rawgId: response.data.id })
    .populate('collectedBy')
    .populate({
      path: 'reviews', 
      populate: {
        path: 'author'
      }
    })
    .then((game)=> {
      res.render("games/show", {
        title: "Game Details",
        apiResult: response.data,
        game,
        userHasGame: game?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
        userHasReviewed: game?.reviews.some(review => review.author?.equals(req.user.profile._id))
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToCollection(req, res) {
  req.body.collectedBy = req.user.profile._id
  Game.findOne({ rawgId: req.params.id })
  .then((game) => {
    if (game) {
      game.collectedBy.push(req.user.profile._id)
      game.save()
      .then(() => {
        res.redirect(`/games/${req.params.id}`)
      })
    } else {
      Game.create(req.body)
      .then(()=> {
        res.redirect(`/games/${req.params.id}`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFromCollection(req, res) {
  // Find the game in the database
  Game.findOne({ rawgId: req.params.id })
  .then(game => {
    // Remove the user's profile id from collectedBy
    game.collectedBy.remove({_id: req.user.profile._id})
    game.save()
    .then(() => {
      res.redirect(`/games/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  search,
  show,
  addToCollection,
  removeFromCollection
}