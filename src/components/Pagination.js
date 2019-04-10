import React from 'react'
import _ from 'lodash'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'


const Pagebar = ({total, current}) => {

  const listsize = 3
  const pagesize = 10
  const totalPages = total > 0 ? Math.ceil(total / listsize) : 1
  const totalGroups = Math.ceil(totalPages / pagesize)
  const currentGroup = Math.ceil(current / pagesize)
  const start = (currentGroup - 1) * pagesize + 1
  const last = currentGroup * pagesize > totalPages ? totalPages : currentGroup * pagesize
  const pageTags = _.map(_.range(start, last), page => {
    return (page === current) ? (
      <PaginationItem active>
        <PaginationLink href="#">{page}</PaginationLink>
      </PaginationItem>
    ) : (
      <PaginationItem>
        <PaginationLink href="#">{page}</PaginationLink>
      </PaginationItem>
    )
  })

  return (
    <Pagination size="sm" aria-label="Page navigation example" className="pagination justify-content-center">
      <PaginationItem disabled={currentGroup === 1}><PaginationLink first href="/" /></PaginationItem>
      <PaginationItem><PaginationLink previous href="#" /></PaginationItem>
      {pageTags}
      <PaginationItem><PaginationLink next href="#" /></PaginationItem>
      <PaginationItem disabled={currentGroup === totalGroups}><PaginationLink last href="#" /></PaginationItem>
    </Pagination>
  )
}

export default Pagebar
