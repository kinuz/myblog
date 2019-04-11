import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout'
import Post from "../components/Post"
import Pagebar from "../components/Pagination"

const PostListTemplate = ({data, pageContext}) => {
  return (
    <Layout pageTitle={`page : 2`} menu="posts">
      <div className="content">
        <div className="content__inner">
          {_.map(data.allMarkdownRemark.edges, edge => (
            <Post data={edge} key={edge.node.id} />
          ))}
        </div>
        <Pagebar {...pageContext}/>
      </div>
    </Layout>
  )
}

export default PostListTemplate


export const pageListQuery = graphql`
    query ($skip: Int!, $listsize: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: $listsize
            skip: $skip
        ) {
            edges {
                node {
                    id
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
