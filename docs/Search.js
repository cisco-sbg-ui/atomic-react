import algoliasearch from "algoliasearch";
import {Link} from "gatsby";
import debounce from "lodash.debounce";
import React, {useCallback, useEffect, useRef, useState} from "react";

import AlgoliaLogo from "../framework/utils/algolia.svg";
import {AListItem, AMenu, ATextInput} from "../framework";

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
    const {hits} = await index.search(term, {
      hitsPerPage: 5
    });
    setPreviousTerm(term);
    setItems(hits);
    setOpen(true);
    setSearchRunning(false);
  };

  const inputRef = useRef(null);
  const [searchRunning, setSearchRunning] = useState(false);
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
        focusOnOpen={false}
        placement="bottom-left"
        onClose={() => setOpen(false)}
        style={{width: 285}}>
        {items.map((x, index) => (
          <AListItem key={index} component={Link} to={x.route}>
            {x.name}
          </AListItem>
        ))}
        <AListItem twoLine className="pa-2 justify-end">
          <AlgoliaLogo />
        </AListItem>
      </AMenu>
    </>
  );
};

export default Search;
