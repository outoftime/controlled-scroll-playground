import * as React from "react";
import { PageNavigation } from "./PageNavigation";
import { PagesWithAsync as Pages } from "./PagesWithAsync";

type Props = {
  numberInterval: number;
  totalPages: number;
  smoothScroll: boolean;
};

type State = {
  currentPage: number;
  pendingPageNavigation?: number;
  number: number;
};

export class AppWithAsync extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0, number: 0 };
  }

  componentDidMount() {
    this.startCounter();
  }

  startCounter() {
    if (!this.props.numberInterval) return;

    setInterval(() => {
      this.setState(state => ({ ...state, number: state.number + 1 }));
    }, this.props.numberInterval);
  }

  handleCurrentPageChange = currentPage => {
    this.setState({ currentPage });
  };

  handlePageNavigation = pageNavigation => {
    this.setState({ pendingPageNavigation: pageNavigation });
  };

  resolvePageNavigation = () => {
    this.setState({ pendingPageNavigation: undefined });
  };

  render() {
    const { currentPage, number, pendingPageNavigation } = this.state;
    const { smoothScroll, totalPages } = this.props;
    return (
      <div className="App">
        <div className="counter">{number}</div>
        <PageNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={this.handlePageNavigation}
        />
        <Pages
          currentPage={currentPage}
          pendingPageNavigation={pendingPageNavigation}
          smoothScroll={smoothScroll}
          totalPages={totalPages}
          onCurrentPageChange={this.handleCurrentPageChange}
          onPageNavigationResolved={this.resolvePageNavigation}
        />
      </div>
    );
  }
}
