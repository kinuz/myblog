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
  const pageTags = _.map(_.range(start, last + 1), page => {
    return (
      <PaginationItem active={page === current} key={page}>
        <PaginationLink href={`${page !== 1 ? `/page/${page}` : '/'}`}>{page}</PaginationLink>
      </PaginationItem>
    )
  })

  return (
    <Pagination size="sm" aria-label="Page navigation example" className="pagination justify-content-center">
      <PaginationItem disabled={currentGroup === 1} key='first'>
        <PaginationLink first href="/" />
      </PaginationItem>
      <PaginationItem disabled={currentGroup === 1} key='prev'>
        <PaginationLink previous href={`/page/${currentGroup * listsize - 1}`} />
      </PaginationItem>
      {pageTags}
      <PaginationItem key='next' disabled={currentGroup === totalGroups}>
        <PaginationLink next href={`/page/${currentGroup * listsize + 1}`} />
      </PaginationItem>
      <PaginationItem key='last' disabled={currentGroup === totalGroups}>
        <PaginationLink last href={`/page/${last}`} />
      </PaginationItem>
    </Pagination>
  )
}

export default Pagebar
