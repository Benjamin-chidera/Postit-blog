import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Loader1 = ({ num }) => {
    let l = [];
    for (let i = 0; i < num; i++) {
      l.push(i);
    }
    return (
      <>
        {l.map((i, index) => {
          return (
            <div
              className="flex md:flex-col lg:flex-row items-center lg:justify-center gap-3 max-w-full w-96"
              key={index}
            >
              <Skeleton
                height={"128px"}
                width={"140px"}
                highlightColor="#444"
              />
              <div className="w-40">
                <Skeleton
                  height={"20px"}
                  width={"100%"}
                  highlightColor="#444"
                />
                <Skeleton height={"100px"} width={"100%"} />
              </div>
            </div>
          );
        })}
      </>
    );
  };
