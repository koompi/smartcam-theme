import { Button, Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

export const PaginationProduct = ({
  page,
  total,
  rowsPerPage,
  setPage,
}: {
  page: number;
  total: number;
  rowsPerPage: number;
  setPage: Function;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const minPice = (searchParams.get("min_price") as string) || null;
  const maxPice = (searchParams.get("max_price") as string) || null;
  const sortParam = (searchParams.get("sort") as string) || null;
  const brands = searchParams.get("brands") || null;

  const onNextPage = () => {
    setPage(page + 1);
    router.push(
      `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
        cat ? cat : ""
      }&sub_category=${sub ? sub : ""}&sort=${
        sub ? sub : ""
      }&min_price=${minPice ? minPice : ""}&max_price=${
        maxPice ? maxPice : ""
      }&page=${page + 1}&size=${rowsPerPage}`
    );
  };

  const onPreviousPage = () => {
    setPage(page - 1);
    router.push(
      `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
        cat ? cat : ""
      }&sub_category=${sub ? sub : ""}&sort=${
        sub ? sub : ""
      }&min_price=${minPice ? minPice : ""}&max_price=${
        maxPice ? maxPice : ""
      }&page=${page - 1}&size=${rowsPerPage}`
    );
  };

  return (
    <>
      <Button
        isDisabled={page == 1}
        size="md"
        variant="flat"
        onPress={onPreviousPage}
      >
        Previous
      </Button>
      <Pagination
        className="text-white"
        isCompact
        showControls
        showShadow
        size="lg"
        color="primary"
        page={page}
        total={total}
        onChange={(p) => {
          setPage(p);
          router.push(
            `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
              cat ? cat : ""
            }&sub_category=${sub ? sub : ""}&sort=${
              sub ? sub : ""
            }&min_price=${minPice ? minPice : ""}&max_price=${
              maxPice ? maxPice : ""
            }&page=${p}&size=${rowsPerPage}`
          );
        }}
      />
      <Button
        isDisabled={page == total}
        size="md"
        variant="flat"
        onPress={onNextPage}
      >
        Next
      </Button>
    </>
  );
};
