import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title: "Game Goose Profiles",
      profiles,
    })
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile)
    .then(userProfile => {
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        userProfile,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  show
}
