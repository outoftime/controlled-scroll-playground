import * as React from "react";
import { PagesProps } from "./types";

export class PagesWithIntersection extends React.Component<PagesProps, {}> {
  visiblePages: Set<number>;
  refMap: Array<Element>;
  observer: IntersectionObserver;

  constructor(props) {
    super(props);
    this.visiblePages = new Set();
    this.refMap = [];
  }

  componentWillMount() {
    this.observer = new IntersectionObserver(
      this.handleIntersectionEntries,
      {}
    );
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  inferPageForId(id) {
    return Number(/\d+$/.exec(id)[0]);
  }

  inferCurrentPage() {
    return this.inferPageForId(Array.from(this.visiblePages).sort()[0]);
  }

  componentDidUpdate() {
    if (this.props.currentPage !== this.inferCurrentPage()) {
      console.warn(this.props.currentPage);
      this.refMap[this.props.currentPage].scrollIntoView();
    }
  }

  handleIntersectionEntries = entries => {
    const visiblePages = new Set(this.visiblePages);
    for (const entry of entries) {
      if (entry.isIntersecting) {
        visiblePages.add(entry.target.id);
      } else {
        visiblePages.delete(entry.target.id);
      }
    }
    this.visiblePages = visiblePages;

    const currentPage = this.inferCurrentPage();
    if (currentPage !== this.props.currentPage) {
      this.props.onCurrentPageChange(currentPage);
    }
  };

  handlePageRef = pageEl => {
    this.observer.observe(pageEl);
    this.refMap[this.inferPageForId(pageEl.id)] = pageEl;
  };

  render() {
    const pages = [];
    for (let i = 0; i < this.props.totalPages; i++) {
      const id = `page${i}`;
      pages.push(
        <div ref={this.handlePageRef} key={id} id={id} className="page">
          {i}
        </div>
      );
    }
    return <>{pages}</>;
  }
}
