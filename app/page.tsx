import Pagination from "./component/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const params = await searchParams;
  return (
    <Pagination totalCount={100} currentPage={params.page || 1} pageSize={10} />
  );
}
