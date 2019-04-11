import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import _ from "lodash"
import moment from 'moment'
import PostLink from "../components/PostLink"

const TagTemplate = ({data, pageContext}) => {

  const { tag } = pageContext
  const tagTitle = pageContext.tag
  const posts = data.allMarkdownRemark.edges

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
