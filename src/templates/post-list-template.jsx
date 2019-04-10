import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Layout from '../components/Layout'
import Post from "../components/Post"
import Pagebar from "../components/Pagination"

class PostListTemplate extends React.Component {

  render() {

    console.log(this.props.pageContext)

    const items = []
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })
    return (
      <Layout pageTitle={`page : 2`} menu="posts">
        <div className="content">
          <div className="content__inner">{items}</div>
          <Pagebar current={this.props.pageContext.current} total={this.props.pageContext.total}/>
        </div>
      </Layout>
    )
  }
}

export default PostListTemplate


export const pageListQuery = graphql`
    query IndexQuery ($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: $limit
            skip: $skip
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
