import React from "react";
import { Pagination, Stack } from "@mui/material";

export default function Paginate({ currentPage, setCurrentPage, totalPages }) {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 2, padding: "10px 20px" }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
          style={{
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          Previous
        </button>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          variant="outlined"
          color="primary"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#1976d2 !important",
              color: "#fff !important",
              border: "1px solid #1976d2",
            },
            "& .MuiPaginationItem-root": {
              color: "#1976d2",
            },
          }}
        />
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="pagination-btn"
          style={{
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </Stack>
    </>
  );
}
