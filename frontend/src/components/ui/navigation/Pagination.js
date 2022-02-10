import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core/";

const Pagination = ({ results, onSaveResults }) => {
  const [page, setPage] = useState(1);
  const resultPerPage = 4;

  useEffect(() => {
    const getSearchResultsPerPage = function (page = 1) {
      setPage(page);
      const start = (page - 1) * resultPerPage;
      const end = page * resultPerPage;

      return results.slice(start, end);
    };

    onSaveResults(getSearchResultsPerPage(page));
  }, [onSaveResults, results, page, resultPerPage]);

  let content;
  let numPages = Math.ceil(results.length / resultPerPage);

  const NextButton = (
    <Button
      style={{ marginLeft: ".5em" }}
      variant="outlined"
      color="primary"
      onClick={() => {
        setPage((prevPage) => prevPage + 1);
        onSaveResults(results);
      }}
    >
      Next
    </Button>
  );

  const BackButton = (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        setPage((prevPage) => prevPage - 1);
        onSaveResults(results);
      }}
    >
      Back
    </Button>
  );

  // Page 1, and there are other pages
  if (page === 1 && numPages > 1) {
    return (content = NextButton);
  }

  // Last page
  if (page === numPages && numPages > 1) {
    return (content = BackButton);
  }

  // Other pages
  if (page < numPages) {
    return (content = (
      <>
        {BackButton}
        {NextButton}
      </>
    ));
  }
  content = <p></p>;

  return content;
};

export default Pagination;
