import React from "react";

export const DefaultListRenderer: React.FC<{
  list: Array<React.ReactNode>;
  noText: React.ReactNode;
}> = ({ list, noText }) => {
  return list.length > 0 ? (
    list.map((item, index) => (
      <React.Fragment key={index}> {item} </React.Fragment>
    ))
  ) : (
    <> {noText}</>
  );
};
