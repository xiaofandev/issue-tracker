import { Skeleton } from "@/app/component/Skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="max-w-xl">
      <div className="space-y-4">
        <div>
          <Skeleton />
        </div>

        <div>
          <Skeleton height={100} />
        </div>

        <div>
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
};

export default loading;
