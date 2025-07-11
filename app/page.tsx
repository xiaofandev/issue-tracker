import Pagination from "./component/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const params = await searchParams;
  return <IssueSummary />;
}
