import * as React from "react";
import { PageNavigation } from "./PageNavigation";
import { PagesWithScroll } from "./PagesWithScroll";
import { PagesWithRememberedScroll } from "./PagesWithRememberedScroll";

type Props = {
  numberInterval: number;
  totalPages: number;
  rememberScroll: boolean;
  smoothScroll: boolean;
};

type State = {
  currentPage: number;
  number: number;
};

export class App extends React.Component<Props, State> {
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

  render() {
    const { currentPage, number } = this.state;
    const { rememberScroll, smoothScroll } = this.props;
    const Pages = rememberScroll ? PagesWithRememberedScroll : PagesWithScroll;
    return (
      <div className="App">
        <div className="counter">{number}</div>
        <PageNavigation
          currentPage={currentPage}
          totalPages={this.props.totalPages}
          onChangePage={this.handleCurrentPageChange}
        />
        <Pages
          currentPage={currentPage}
          smoothScroll={smoothScroll}
          totalPages={this.props.totalPages}
          onCurrentPageChange={this.handleCurrentPageChange}
        />
      </div>
    );
  }
}
