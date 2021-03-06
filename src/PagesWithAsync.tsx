import * as React from "react";

import { PagesProps } from "./types";

interface Props extends PagesProps {
  pendingPageNavigation?: number;
  onPageNavigationResolved: () => void;
}

export class PagesWithAsync extends React.Component<Props, {}> {
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
    if (this.props.pendingPageNavigation != null) {
      this.refMap[this.props.pendingPageNavigation].scrollIntoView({
        behavior: this.props.smoothScroll ? "smooth" : "auto"
      });
      this.props.onPageNavigationResolved();
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
