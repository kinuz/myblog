import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const Pagebar = () => {

  return (
    <Pagination size="sm" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink href="#">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
  )
}

export default Pagebar
