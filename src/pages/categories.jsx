import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const CategoriesRoute = ({ data }) => {
  const categories = data.allMarkdownRemark.group
  return (
    <Layout pageTitle="All Categories">
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">Categories</h1>
            <div className="page__body">
              <div className="categories">
                <ul className="categories__list">
                  {categories.map(category => (
                    <li
                      key={category.fieldValue}
                      className="categories__list-item"
                    >
                      <Link
                        to={`/categories/${kebabCase(
                          category.fieldValue
                        )}/`}
                        className="categories__list-item-link"
                      >
                        {category.fieldValue} ({category.totalCount})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoriesRoute

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
