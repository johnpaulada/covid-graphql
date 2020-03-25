require('isomorphic-fetch')

const CORONA_STATS_API = 'https://corona-stats.online/?format=json'

const resolvers = {
    Query: {
      countryStats: async () => (await (await fetch(CORONA_STATS_API)).json()).data
    },
  };
  
export default resolvers;