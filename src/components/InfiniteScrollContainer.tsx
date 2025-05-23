import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export interface InfiniteScrollContainerInterface {
  list: Array<any>;
  children?: React.ReactNode;
  length?: any;
  next?: any;
  hasMore?: boolean;
}

const InfiniteScrollContainer: React.FC<InfiniteScrollContainerInterface> = ({
  list,
  children,
  hasMore = true,
  length,
  next,
}) => {
  return (
    <InfiniteScroll
      dataLength={length}
      next={next}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {list.map((data: any, index: number) => (
        <div>{JSON.stringify(data)}</div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollContainer;
