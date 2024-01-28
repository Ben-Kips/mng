const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the your name"],
    },
    email: {
      type: String,
      required: [true, "please add the user email address"],
    },
    subject: {
      type: String,
      required: [true, "Please add  your subject mattter "],
    },
    clientMessage: {
      type: String,
      required: [true, "Please write your message"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);
