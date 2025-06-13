import { Skeleton } from "@/app/component/Skeleton";
import { Card } from "@radix-ui/themes";

const loading = () => {
  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <Skeleton className="max-w-60" />
      </div>
      <div className="flex space-x-4">
        <Skeleton width={100} />
        <Skeleton width={100} />
      </div>
      <div>
        <Card>
          <Skeleton count={3} />
        </Card>
      </div>
    </div>
  );
};

export default loading;
