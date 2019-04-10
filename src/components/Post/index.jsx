import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'
import { Badge } from 'reactstrap'
import kebabCase from 'lodash/kebabCase'

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
      tags,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields

    return (
      <div className="post">
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format('MMM / DD / YYYY')}
          >
            {moment(date).format('MMM / DD / YYYY')}
          </time>
          <span className="post__meta-divider" />
          <span className="post__meta-category" key={categorySlug}>
            <Link to={categorySlug} className="post__meta-category-link">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="post__description">{description}</p>
        {tags.map(tag => (
          <Link to={`/tags/${kebabCase(tag)}/`} key={tag}>
            <Badge color="primary mr-1">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    )
  }
}

export default Post
