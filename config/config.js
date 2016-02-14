var config = {
  expireTime: 24 * 60 * 60 * 7,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  seedData: true,
  primavera: {
  	url: (process.env.PRIMAVERA_URI ? process.env.PRIMAVERA_URI : 'http://9fa30986.ngrok.io/api/')
  },
  db: {
    url: (process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://sinf:3cmYw6WRBZFKnv@glados.edr.io/sinf?ssl=true')
    //url: 'mongodb://localhost/sinf'
  }
};

module.exports = config
