const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://kinuz@github.com/kinuz/kinuz.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)