import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Loader2 = ({ num }) => {
  let l = [];

  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <>
      {l.map((i, index) => {
        return (
          <div
            className=" items-center lg:justify-center gap-3 max-w-full"
            key={index}
          >
            <Skeleton height={"250px"} width={"300px"} highlightColor="#444" />

            <Skeleton height={"30px"} width={"250px"} highlightColor="#444" />
            <Skeleton height={"20px"} width={"250px"} />
            <Skeleton height={"150px"} width={"300px"} />
            <Skeleton height={"20px"} width={"150px"} />
          </div>
        );
      })}
    </>
  );
};
