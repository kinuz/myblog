const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {

    const Templates = {
      postTemplate: path.resolve('./src/templates/post-template.jsx'),
      pageTemplate: path.resolve('./src/templates/page-template.jsx'),
      tagTemplate: path.resolve('./src/templates/tag-template.jsx'),
      categoryTemplate: path.resolve('./src/templates/category-template.jsx'),
      postListTemplate: path.resolve('./src/templates/post-list-template.jsx'),
    }


    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
                category
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }
      const [posts, pages] = _.partition(result.data.allMarkdownRemark.edges, edge => {
        return edge.node.frontmatter.layout === 'post'
      })
      const postTotal = posts.length
      _.each(pages, edge => {
        createPage({
          path: edge.node.fields.slug,
          component: slash(Templates.pageTemplate),
          context: {
            slug: edge.node.fields.slug,
            postTotal: postTotal
          },
        })
      })


      _.each(posts, edge => {
        createPage({
          path: edge.node.fields.slug,
          component: slash(Templates.postTemplate),
          context: { slug: edge.node.fields.slug },
        })

        let tags = []
        if (_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }

        tags = _.uniq(tags)
        _.each(tags, tag => {
          const tagPath = `/tags/${_.kebabCase(tag)}/`
          createPage({
            path: tagPath,
            component: Templates.tagTemplate,
            context: { tag },
          })
        })

        let categories = []
        if (_.get(edge, 'node.frontmatter.category')) {
          categories = categories.concat(edge.node.frontmatter.category)
        }

        categories = _.uniq(categories)
        _.each(categories, category => {
          const categoryPath = `/categories/${_.kebabCase(category)}/`
          createPage({
            path: categoryPath,
            component: Templates.categoryTemplate,
            context: { category },
          })
        })

      })



      const postsPerPage = 3
      const numberOfPages = Math.ceil( postTotal / postsPerPage)
      Array.from({ length: numberOfPages }).forEach((_, index) => {
        if (index === 0) return
        createPage({
          path: `/page/${index+1}`,
          component: Templates.postListTemplate,
          context: {
            total: postTotal,
            limit: postsPerPage,
            skip: index * postsPerPage,
            current: index+1
          }
        })
      })
      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)
    let slug = fileNode.fields.slug
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}
