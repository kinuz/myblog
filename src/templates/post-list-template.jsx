import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import Pagebar from "../components/Pagination"

class PostListTemplate extends React.Component {
  render() {


    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const posts = this.props.data.allMarkdownRemark.edges

    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    const tmp = JSON.stringify(this.props)
    return (
      <Layout>
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={subtitle} />
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            {tmp}
            <div className="content__inner">{items}</div>
            <Pagebar/>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostListTemplate

export const pageListQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
                subtitle
                copyright
                menu {
                    label
                    path
                }
                author {
                    name
                    email
                    telegram
                    twitter
                    github
                    linkedin
                    facebook
                    rss
                    vk
                }
            }
        }
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
