import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus'
import './style.scss'
import { Badge } from "reactstrap"
import _ from 'lodash'

const PostTemplateDetails = (props) => {
  const post = props.data.markdownRemark
  const tags = post.fields.tagSlugs


  return (
    <div>
      <div>
        <Link className="post-single__home-button" to="/">
          Home
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
              Published {moment(post.frontmatter.date).format('MMMM Do YYYY, h:mm:ss a')}
            </em>
          </div>
        </div>
        <div className="post-single__footer">
          <div className="">
            Tags: {' '}
            {tags &&
            tags.map((tag, i) => (
              <Link to={tag} className="mr-1" key={tag}>
                <Badge color="primary">
                  {post.frontmatter.tags[i]}
                </Badge>
              </Link>
            ))}
          </div>
          <hr />
          Related
          <ul>
            {post.frontmatter.refs && _.map(post.frontmatter.refs, (ref) => (
              <li key={ref}>
                <a href={ref} rel="noreferrer noopener" target="_blank">{ref}</a>
              </li>
            ))}
          </ul>
          <div>
            <Disqus
              postNode={post}
              siteMetadata={props.data.site.siteMetadata}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostTemplateDetails
