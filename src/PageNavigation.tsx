import * as React from "react";

export function PageNavigation({currentPage, totalPages, onChangePage}) {
  const buttons = [];
  for (let i = 0; i < totalPages; i++) {
    const highlighted = i === currentPage;
    buttons.push(<div
      className={`button ${highlighted ? 'highlighted' : ''}`}
      key={i}
      onClick={() => onChangePage(i)}
    >{i}</div>);
  }
  
  return (
    <div className="sidebar">
      {buttons}
    </div>
  );
}
