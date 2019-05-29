import * as React from "react";
import { PagesProps } from "./types";

export class PagesWithRememberedScroll extends React.Component<PagesProps, {}> {
  lastSeenPage: number;
  refMap: Array<Element>;

  constructor(props) {
    super(props);
    this.lastSeenPage = 0;
    this.refMap = [];
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  rememberLastSeenPage() {
    this.lastSeenPage = this.refMap.findIndex(el => {
      const boundingRect = el.getBoundingClientRect();
      return boundingRect.bottom > 0;
    });
  }

  inferPageForId(id) {
    return Number(/\d+$/.exec(id)[0]);
  }

  componentDidUpdate() {
    if (this.props.currentPage !== this.lastSeenPage) {
      console.log(
        "Got currentPage",
        this.props.currentPage,
        "different from last seen current page",
        this.lastSeenPage,
        "initiating scroll"
      );
      this.refMap[this.props.currentPage].scrollIntoView({
        behavior: this.props.smoothScroll ? "smooth" : "auto"
      });
    }
  }

  handleScroll = () => {
    const previousLastSeenPage = this.lastSeenPage;
    this.rememberLastSeenPage();
    if (previousLastSeenPage !== this.lastSeenPage) {
      console.log(
        "Updating page after scroll, was",
        previousLastSeenPage,
        "now",
        this.lastSeenPage
      );
      this.props.onCurrentPageChange(this.lastSeenPage);
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
