import React from 'react'
import Helmet from 'react-helmet'
import '../assets/scss/init.scss'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { graphql, StaticQuery } from "gatsby"
import Sidebar from "./Sidebar"

const Layout = ({ children, pageTitle, hideSidebar }) => {

  return (
    <StaticQuery query={LayoutQuery} render={data => {
      const { title, subtitle } = data.site.siteMetadata
      const sidebar_tag = hideSidebar ? '' : <Sidebar/>

        return (
        <div className="layout">
          <Helmet>
            <title>{title} - {pageTitle}</title>
            <meta name="description" content={subtitle} />
          </Helmet>
            {sidebar_tag}
          {children}
        </div>
      )
    }}></StaticQuery>
  )
}

export default Layout


export const LayoutQuery = graphql`
    query LayoutQuery {
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
    }
`
