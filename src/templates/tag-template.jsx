import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from "../components/Post"

const TagTemplate = ({data, pageContext}) => {

  const { tag } = pageContext
  const items = []
  const tagTitle = pageContext.tag
  const posts = data.allMarkdownRemark.edges
  posts.forEach(post => {
    items.push(<Post data={post} key={post.node.fields.slug} />)
  })

  return (
    <Layout pageTitle={`All Posts tagged as "${tag}"`} menu="tags">
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              All Posts tagged as &quot;
              {tagTitle}
              &quot;
            </h1>
            <div className="page__body">{items}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagTemplate

export const tagQuery = graphql`
  query ($tag: String!) {
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
