// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// type DynamicPaginationProps = {
//   totalPages: number;
//   currentPage: number;
// };

// export const DynamicPagination = ({
//   totalPages,
//   currentPage,
// }: DynamicPaginationProps) => {
//   return (
//     <Pagination>
//       <PaginationContent>
//         {/* Previous */}
//         {currentPage > 1 && (
//           <PaginationItem>
//             <PaginationPrevious href={`?page=${currentPage - 1}`} />
//           </PaginationItem>
//         )}

//         {/* Pages */}
//         {Array.from({ length: totalPages }).map((_, i) => {
//           const page = i + 1;
//           return (
//             <PaginationItem key={page}>
//               <PaginationLink
//                 href={`?page=${page}`}
//                 isActive={page === currentPage}
//               >
//                 {page}
//               </PaginationLink>
//             </PaginationItem>
//           );
//         })}

//         {currentPage < totalPages && (
//           <PaginationItem>
//             <PaginationNext href={`?page=${currentPage + 1}`} />
//           </PaginationItem>
//         )}
//       </PaginationContent>
//     </Pagination>
//   );
// };

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// type DynamicPaginationProps = {
//   totalPages: number;
//   currentPage: number;
// };

// export const DynamicPagination = ({
//   totalPages,
//   currentPage,
// }: DynamicPaginationProps) => {
//   // Харагдах хуудсуудыг тооцоолох (Одоогийн хуудас, түүний өмнөх ба дараагийнх)
//   const getVisiblePages = () => {
//     const pages = [];
//     const start = Math.max(1, currentPage - 1);
//     const end = Math.min(totalPages, start + 2);

//     // Хэрэв төгсгөлийн хуудас хүрсэн бол эхлэлийг нь багасгаж 3 хуудас харуулахыг хичээнэ
//     const adjustedStart = Math.max(1, end - 2);

//     for (let i = adjustedStart; i <= end; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <Pagination>
//       <PaginationContent>
//         {/* Өмнөх хуудас */}
//         {currentPage > 1 && (
//           <PaginationItem>
//             <PaginationPrevious href={`?page=${currentPage - 1}`} />
//           </PaginationItem>
//         )}

//         {/* Эхний хуудас ба цэг (Хэрэв эхний хуудас харагдахгүй байгаа бол) */}
//         {visiblePages[0] > 1 && (
//           <>
//             <PaginationItem>
//               <PaginationLink href="?page=1">1</PaginationLink>
//             </PaginationItem>
//             {visiblePages[0] > 2 && <PaginationEllipsis />}
//           </>
//         )}

//         {/* Дундын 3 хуудас */}
//         {visiblePages.map((page) => (
//           <PaginationItem key={page}>
//             <PaginationLink
//               href={`?page=${page}`}
//               isActive={page === currentPage}
//             >
//               {page}
//             </PaginationLink>
//           </PaginationItem>
//         ))}

//         {/* Төгсгөлийн хуудас ба цэг (Хэрэв сүүлийн хуудас харагдахгүй байгаа бол) */}
//         {visiblePages[visiblePages.length - 1] < totalPages && (
//           <>
//             {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
//               <PaginationEllipsis />
//             )}
//             <PaginationItem>
//               <PaginationLink href={`?page=${totalPages}`}>
//                 {totalPages}
//               </PaginationLink>
//             </PaginationItem>
//           </>
//         )}

//         {/* Дараагийн хуудас */}
//         {currentPage < totalPages && (
//           <PaginationItem>
//             <PaginationNext href={`?page=${currentPage + 1}`} />
//           </PaginationItem>
//         )}
//       </PaginationContent>
//     </Pagination>
//   );
// };

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DynamicPaginationProps = {
  totalPages: number;
  currentPage: number;
};

export const DynamicPagination = ({
  totalPages,
  currentPage,
}: DynamicPaginationProps) => {
  const getVisiblePages = () => {
    // 1. Одоогийн хуудас дээр тулгуурлан эхлэх цэгийг тооцоолно
    // (Хэрэв 1-р хуудас бол 1, 2, 3. Хэрэв сүүлийнх бол сүүлийн 3)
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);

    // Жагсаалтын төгсгөлд очсон үед үргэлж 3 хуудас харуулахын тулд start-ыг дахин тохируулна
    if (end === totalPages) {
      start = Math.max(1, end - 2);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {/* ... Эхний хэсэгт Ellipsis (Хэрэв 1-р хуудас жагсаалтад байхгүй бол) */}
        {visiblePages[0] > 1 && <PaginationEllipsis />}

        {/* Дундын 3 хуудас (Энд л 10 эсвэл бусад тоонууд орж ирнэ) */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ... Сүүлийн хэсэгт Ellipsis (Хэрэв сүүлийн хуудас жагсаалтад байхгүй бол) */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <PaginationEllipsis />
        )}

        {/* Next */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
