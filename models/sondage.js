const mongoose = require("mongoose");
const { Schema } = mongoose;

const sondageSchema = new Schema(
  {
    sujet: {
      type: String,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

const sondage = mongoose.model("Sondage", sondageSchema);

module.exports = sondage;
