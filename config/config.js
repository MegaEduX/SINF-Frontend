var config = {
  expireTime: 24 * 60 * 60 * 7,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  seedData: true,
  db: {
    	//url: 'mongodb://heroku_n275hh7p:fs6oc1uqticprchfc58q8h89o9@ds033097.mongolab.com:33097/heroku_n275hh7p'
    url: (process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/sinf')
  }
};

module.exports = config
