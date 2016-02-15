var config = {
  expireTime: 24 * 60 * 60 * 7,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  seedData: true,
  primavera: {
  	url: process.env.PRIMAVERA_URI
  },
  db: {
    url: process.env.MONGOLAB_URI
  }
};

module.exports = config
