import { Message } from '../models/message.js'

function index(req, res) {
  Message.find({})
  .populate('author')
  .sort({createdAt: "asc"})
  .then((messages) => {
    res.render('messages/index', {
      title: 'Message Board',
      messages: messages.reverse()
    })
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
  Message.create(req.body)
  .then(()=> {
    res.redirect('/messages')
  })
}

export { 
  index,
  create
}