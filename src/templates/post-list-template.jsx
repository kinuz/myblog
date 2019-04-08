import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Layout from '../components/Layout'
import Post from "../components/Post"
import Pagebar from "../components/Pagination"

class PostListTemplate extends React.Component {
  render() {
    const items = []
    const posts = this.props.data.allMarkdownRemark.edges

    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })
    return (
      <Layout pageTitle={`page : 2`}>
        <div className="content">
          <div className="content__inner">{items}</div>
          <Pagebar/>
        </div>
      </Layout>
    )
  }
}

export default PostListTemplate


export const pageListQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 3
            skip: 0
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
