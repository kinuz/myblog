import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus/Disqus'
import './style.scss'
import { Badge } from "reactstrap"

class PostTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs

    return (
      <div>
        <div>
          <Link className="post-single__home-button" to="/">
            All Posts
          </Link>
        </div>
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(post.frontmatter.date).format('D MMM YYYY')}
              </em>
            </div>
          </div>
          <div className="post-single__footer">
            <div className="">
              Tags: {' '}
              {tags &&
              tags.map((tag, i) => (
                <Link to={tag} className="mr-1">
                  <Badge color="primary" key={tag}>
                    {post.frontmatter.tags[i]}
                  </Badge>
                </Link>
              ))}
            </div>
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
            <div>
              <Disqus
                postNode={post}
                siteMetadata={this.props.data.site.siteMetadata}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
