import * as React from "react";
import { PagesProps } from "./types";

export class PagesWithScroll extends React.Component<PagesProps, {}> {
  refMap: Array<Element>;

  constructor(props) {
    super(props);
    this.refMap = [];
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  inferCurrentPage() {
    return this.refMap.findIndex(el => {
      const boundingRect = el.getBoundingClientRect();
      return boundingRect.bottom > 0;
    });
  }

  inferPageForId(id) {
    return Number(/\d+$/.exec(id)[0]);
  }

  componentDidUpdate() {
    const currentPage = this.inferCurrentPage();
    if (this.props.currentPage !== currentPage) {
      this.refMap[this.props.currentPage].scrollIntoView({
        behavior: this.props.smoothScroll ? "smooth" : "auto"
      });
    }
  }

  handleScroll = () => {
    const currentPage = this.inferCurrentPage();
    if (currentPage !== this.props.currentPage) {
      this.props.onCurrentPageChange(currentPage);
    }
  };

  handlePageRef = pageEl => {
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
