import algoliasearch from "algoliasearch";
import {Link} from "gatsby";
import debounce from "lodash.debounce";
import React, {useCallback, useEffect, useRef, useState} from "react";

import AlgoliaLogo from "../framework/utils/algolia.svg";
import {
  AListItem,
  AListItemAvatar,
  AListItemContent,
  AMenu,
  ATextInput
} from "../framework";

const Search = () => {
  const client = algoliasearch(
    "NUT7B5FGKT",
    "6e8a1bb15c50d7e391219fa54b2bd109"
  );
  const index = client.initIndex("Docs");

  const searchCallback = async function (rawTerm) {
    const term = (rawTerm || "").trim();
    if (searchRunning || term.length === 0 || term === previousTerm) {
      return;
    }
    setSearchRunning(true);
    // Atomic behavior specifies 2 seconds before showing the loader.
    let loadingTimeout = setTimeout(() => {
      setLoading(true);
    }, 2000);
    const {hits} = await index.search(term, {
      hitsPerPage: 5
    });
    clearTimeout(loadingTimeout);
    setLoading(false);
    setPreviousTerm(term);
    setItems(hits);
    setOpen(true);
    setSearchRunning(false);
  };

  const inputRef = useRef(null);
  const [searchRunning, setSearchRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousTerm, setPreviousTerm] = useState();
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const onChange = useCallback(debounce(searchCallback, 350), []);
  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <>
      <ATextInput
        ref={inputRef}
        clearable={value.length > 0}
        prependIcon="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <AMenu
        anchorRef={inputRef}
        open={open}
        placement="bottom-left"
        onClose={() => setOpen(false)}>
        {items.map((x, index) => (
          <AListItem key={index} twoLine>
            <AListItemAvatar>
              <Link to={x.route}>{x.name}</Link>
            </AListItemAvatar>
            <AListItemContent>{x.excerpt}</AListItemContent>
          </AListItem>
        ))}
        <AlgoliaLogo />
      </AMenu>
    </>
  );
};

export default Search;
