// import React from "react";

// function Pagination(startSlice, articlesParPage, currentPage) {
//   return (
//     <>
//       <button
//         onClick={function change(e) {
//           if (currentPage < 2) {
//             e.preventDefault();
//           } else {
//             setstartSlice(startSlice + 6);
//             setarticlesParPage(articlesParPage + 6);
//             setcurrentPage(currentPage - 1);
//           }
//         }}
//       >
//         previous
//       </button>
//       <span>
//         {currentPage} / {lastPage}
//       </span>
//       <button
//         onClick={function change(e) {
//           if (currentPage >= lastPage) {
//             e.preventDefault();
//           } else {
//             setstartSlice(startSlice - 6);
//             setarticlesParPage(articlesParPage - 6);
//             setcurrentPage(currentPage + 1);
//           }
//         }}
//       >
//         next
//       </button>
//     </>
//   );
// }

// export default Pagination;
