var config = {
  expireTime: 24 * 60 * 60 * 7,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  seedData: true,
  primavera: {
  	url: (process.env.PRIMAVERA_URI ? process.env.PRIMAVERA_URI : 'http://ce6fe0db.ngrok.io/api/')
  },
  db: {
    url: (process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://sinf:3cmYw6WRBZFKnv@glados.edr.io/sinf?ssl=true')
  }
};

module.exports = config
