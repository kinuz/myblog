import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TagTemplateDetails from '../components/TagTemplateDetails'

class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext

    return (
      <Layout pageTitle={`All Posts tagged as "${tag}"`} menu="tags">
        <TagTemplateDetails {...this.props} />
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
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
