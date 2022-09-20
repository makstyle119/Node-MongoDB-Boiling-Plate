const { default: mongoose } = require('mongoose');
const Connect = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: false,
      useUnifiedTopology: false,
    })
    .then(() => {
      console.log('MongoDB is successfully connected.. ');
    })
    .catch((err) => console.log(err));

module.exports = Connect;
