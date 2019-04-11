import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import _ from 'lodash'
import Pagebar from '../components/Pagination'

const IndexRoute = ({ data }) => {


  const items = []
  const posts = data.allMarkdownRemark.edges

  _.each(posts.slice(0, data.site.siteMetadata.configs.listsize), post => {
    items.push(<Post data={post} key={post.node.fields.slug}/>)
  })
  return (
    <Layout pageTitle="blog by Kinuz" menu="posts">
      <div className="content">
        <div className="content__inner">{items}</div>
        <Pagebar current={1} total={posts.length} {...data.site.siteMetadata.configs}/>
      </div>
    </Layout>
  )
}

export default IndexRoute

export const PostListQuery = graphql`
    query {
        site {
            siteMetadata {
                configs{
                    pagesize
                    listsize
                }
                url
                title
                subtitle
                copyright
                disqusShortname
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
            limit: 1000
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

