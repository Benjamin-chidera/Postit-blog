import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MyStoriesLoader = ({ num }) => {
  let l = [];

  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div>
      {l.map((i, index) => {
        return (
          <div
            className=" items-center lg:justify-center gap-3 max-w-full"
            key={index}
          >
            <Skeleton height={"60px"} width={"300px"} highlightColor="#444" />
            <Skeleton height={"80px"} width={"580px"} highlightColor="#444" />
            <Skeleton height={"20px"} width={"150px"} />
          </div>
        );
      })}
    </div>
  );
};
