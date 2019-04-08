import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Pagebar from '../components/Pagination'

const IndexRoute = () => (
    <StaticQuery query={PostListQuery} render={data => {
      const items = []
      const posts = data.allMarkdownRemark.edges

      posts.forEach(post => {
        items.push(<Post data={post} key={post.node.fields.slug} />)
      })

      return (
        <Layout pageTitle="blog by Kinuz">
          <div className="content">
            <div className="content__inner">{items}</div>
            <Pagebar current={1}/>
          </div>
        </Layout>
      )
    }}
    ></StaticQuery>
)

export default IndexRoute

export const PostListQuery = graphql`
    query PostListQuery {
        allMarkdownRemark(
            limit: 3
            filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
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
                        date(formatString: "MMM Do YYYY")
                        category
                        description
                        tags
                    }
                }
            }
        }
    }
`

