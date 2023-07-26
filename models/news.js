const { Schema, model } = require("mongoose");

const newsSchema = Schema({
  imgUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
  },
  url: {
    type: String,
  },
  externalId: {
    type: String,
    select: false,
  },
},
{
  versionKey: false,
}
);

const News = model("News", newsSchema);

module.exports = News;
