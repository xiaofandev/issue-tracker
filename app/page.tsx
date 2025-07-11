import Pagination from "./component/Pagination";
import LatestIssues from "./LatestIssues";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const params = await searchParams;
  return <LatestIssues />;
}
