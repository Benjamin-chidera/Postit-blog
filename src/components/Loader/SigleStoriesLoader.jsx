import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SingleStoriesLoader = ({ num }) => {
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
            <Skeleton height={"28px"} width={"100px"} highlightColor="#444" />
            <div className="flex gap-2 items-center">
              <Skeleton
                height={"32px"}
                width={"32px"}
                highlightColor="#444"
                circle
              />
              <Skeleton height={"24px"} width={"80px"} highlightColor="#444" />
            </div>
            <Skeleton height={"537px"} width={"100%"} />

            <Skeleton height={"80px"} width={"100%"} />
            <Skeleton height={"50px"} width={"350px"} />
          </div>
        );
      })}
    </>
  );
};
