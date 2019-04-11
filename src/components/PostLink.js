import React from 'react'


const PostLink = ({ node }) => {
  const link = node.fields.slug
  return (
    <a href={link} rel="noreferrer noopener">
      {node.frontmatter.title}
    </a>
  )
}

export default PostLink
