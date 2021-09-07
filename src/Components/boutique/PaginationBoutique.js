// PAGINATION Material UI
import { React, useState, useEffect } from "react";

//export const PaginationBoutique = (pagination, nbrArticle, handle) => {
  const [nbrArticle, setNbrArticle] = useState(2);
  const [pagination, setPagination] = useState(1);
  const [width, setWidth] = useState(0);

  const setResize = useCallback((e) => {
    setWidth(e.target.innerWidth);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setResize);
    return () => {
      window.removeEventListener("resize", setResize);
    };
  }, [setResize]);
  useEffect(() => {
    width > 800 ? setarticlesParPage(4) : setarticlesParPage(2);
  }, [width]);

  const handle = (event, value) => {
    setPagination(value);
  };
};
