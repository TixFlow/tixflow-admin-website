import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationNavProps {
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
}

export default function PaginationNav({
  page,
  setPage,
  totalPages,
}: PaginationNavProps) {
  return (
    <div className="container mx-auto py-5">
      <Pagination className="w-full">
        <PaginationContent>
          <PaginationItem>
            <Button
              className="h-14 w-14"
              variant="outline"
              size="icon"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              <ChevronLeft className="h-10 w-10" />
            </Button>
          </PaginationItem>
          <PaginationItem className="w-fit h-full">
            <Button
              variant="outline"
              disabled
              className="w-fit h-full text-2xl"
            >
              {page} / {totalPages}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              className="h-14 w-14"
              variant="outline"
              size="icon"
              onClick={() => {
                if (page < totalPages) {
                  setPage(page + 1);
                }
              }}
            >
              <ChevronRight className="h-10 w-10" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
