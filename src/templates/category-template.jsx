import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CategoryTemplateDetails from '../components/CategoryTemplateDetails'

class CategoryTemplate extends React.Component {
  render() {
    const { category } = this.props.pageContext

    return (
      <Layout pageTitle={`${category}`}>
        <CategoryTemplateDetails {...this.props} />
      </Layout>
    )
  }
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
