import React from 'react';
import { FilterWrapper } from '../../styles/Filter.style';
import { Checkbox } from 'antd';
import { Typography } from '../../GlobalStyle.js';
import { useDispatch } from 'react-redux';
import { filterRooms } from '../../redux/room/roomSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const handlefilterCategory = (e) => {
    if (e.target.checked) {
      const data = e.target.name;
      const queryStr = {
        category: data,
      };
      dispatch(filterRooms(queryStr));
    }
  };
  const handlefilterBedSize = (e) => {
    if (e.target.checked) {
      const data = e.target.name;
      const queryStr = {
        bedSize: data,
      };
      dispatch(filterRooms(queryStr));
    }
  };

  return (
    <>
      <FilterWrapper>
        <div className="container">
          <div className="header__title">
            <Typography as="h3" fontSize="1rem" fontWeight="600">
              Filter by:
            </Typography>
          </div>

          <div className="filter">
            <Typography as="h3" fontSize="1rem" fontWeight="600">
              Room Type
            </Typography>
            <div className="filter__items">
              <Checkbox onChange={handlefilterCategory} name="exclusive">
                Exclusive
              </Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox onChange={handlefilterCategory} name="delux">
                Delux
              </Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox onChange={handlefilterCategory} name="presidential">
                Presidential
              </Checkbox>
            </div>
          </div>
          <div className="filter">
            <Typography as="h3" fontSize="1rem" fontWeight="600">
              Bed Size
            </Typography>
            <div className="filter__items">
              <Checkbox onChange={handlefilterBedSize} name="king">
                King
              </Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox onChange={handlefilterBedSize} name="double_king">
                Double King
              </Checkbox>
            </div>
          </div>
          {/* <div className="filter">
            <Typography as="h3" fontSize="1rem" fontWeight="600">
              Star rating
            </Typography>
            <div className="filter__items">
              <Checkbox>1 star</Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox>2 star</Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox>3 star</Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox>4 star</Checkbox>
            </div>
            <div className="filter__items">
              <Checkbox>5 star</Checkbox>
            </div>
          </div> */}
        </div>
      </FilterWrapper>
    </>
  );
};

export default Filter;
