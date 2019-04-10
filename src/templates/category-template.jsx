import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from "../components/Post"

const CategoryTemplate = ({data, pageContext}) => {
  const { category } = pageContext
  const items = []

  const posts = data.allMarkdownRemark.edges
  posts.forEach(post => {
    items.push(<Post data={post} key={post.node.fields.slug} />)
  })

  return (
    <Layout pageTitle={`All Posts in ${category} category`} menu="category">
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">{category}</h1>
            <div className="page__body">{items}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryTemplate

export const CategoryQuery = graphql`
  query ($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $category }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
            tags
          }
        }
      }
    }
  }
`
