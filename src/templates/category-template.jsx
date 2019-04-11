import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import moment from 'moment'
import _ from 'lodash'
import PostLink from '../components/PostLink'

const CategoryTemplate = ({data, pageContext}) => {
  const { category } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout pageTitle={`All Posts in ${category} category`} menu="category">
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              {category} category ({posts.length})
            </h1>
            <div className="page__body">
              {_.map(posts, post => (
                <div key={post.node.id}>
                  {moment(post.node.frontmatter.date).format('YYYY-MM-DD')}
                  {' '}
                  <PostLink {...post}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryTemplate

export const CategoryQuery = graphql`
  query ($category: String!) {
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
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
