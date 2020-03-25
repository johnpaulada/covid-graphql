require('isomorphic-fetch')

const CORONA_STATS_API = 'https://corona-stats.online/?format=json'

const filterHandlers = {
  country: country => data => {
    return data.filter(item => item.country === country)
  }
}

const filterWith = filters => data => {
  return Object.entries(filterHandlers).reduce((filteredData, [name, handler]) => {
    return name in filters
      ? handler(filters[name])(filteredData)
      : filteredData
  }, data) 
}

const resolvers = {
    Query: {
      countryStats: async (_, args) => {
        const response = await fetch(CORONA_STATS_API)
        const json = await response.json()
        const data = json.data
        const { filter } = args

        return filter
          ? filterWith(filter)(data)
          : data
      }
    }
  };
  
export default resolvers;