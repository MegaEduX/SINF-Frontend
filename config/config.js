var config = {
  expireTime: 24 * 60 * 60 * 7,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  seedData: true,
  db: {
    url: 'mongodb://localhost/sinf'
  }
};

module.exports = config
