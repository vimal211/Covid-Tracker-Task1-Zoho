import React, { useContext, useEffect } from "react";
import "./FilterBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../Context/DataContext";

function FilterBar({ name }) {
  let [
    stateData,
    stateDate,
    searchState,
    setSearchState,
    updateDate,
    setUpdateDate,
  ] = useContext(DataContext);

  let navigate = useNavigate();
  let params = useParams();
  let prevDate = localStorage.getItem(`date-${params.state}`);
  useEffect(() => {
    if (prevDate) {
      setUpdateDate(prevDate);
    } else {
      setUpdateDate("");
    }
  }, []);
  const moveToHome = () => {
    return navigate("/");
  };
  const searchStates = (e) => {
    let input = e.target.value;
    let stateFound = [];
    if (input === "") {
      setSearchState(stateData);
    } else {
      stateFound = stateData.filter((ele) => {
        if (ele.name.toLowerCase().includes(input.toLowerCase())) {
          return ele;
        }
      });
      setSearchState(stateFound);
    }
  };

  const updateDates = (e) => {
    let date = e.target.value;
    console.log(date);
    localStorage.setItem(`date-${params.state}`, date);
    setUpdateDate(date);
  };

  return (
    <div className="filterContainer">
      <div className="states">
        {console.log(prevDate)}
        <p onClick={moveToHome}>
          {params.state ? (
            <FontAwesomeIcon icon={("fas", faLongArrowAltLeft)} />
          ) : (
            ""
          )}
        </p>
        <p>{params.state ? params.state : name}</p>
      </div>
      {params.state ? (
        <div>
          {" "}
          <input
            defaultValue={prevDate ? prevDate : ""}
            className="date"
            onChange={updateDates}
            type="date"
          />
        </div>
      ) : (
        <div className="searchBar">
          <input onChange={searchStates} type="text" placeholder="Search" />
        </div>
      )}
    </div>
  );
}

export default FilterBar;
