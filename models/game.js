import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  rawgId: Number,
  released: Date,
  imageUrl: String,
  collectedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  // To be filled in later
  // reviews: [reference GameReview],
},{
  timestamps: true,
});

const Game = mongoose.model("Game", gameSchema)

export {
	Game
}
