import { useEffect, useState, useCallback } from 'react';
import ComboBox from '@/components/Combobox';
import { TrashIcon } from '@heroicons/react/outline';
import { FilterIcon } from '@heroicons/react/solid';
import MultiSelect from '@/components/MultiSelect';

const GraphFilterList = ({
  filters,
  eligibleFilters,
  setFilters,
  dictionary,
}) => {
  const [cardinalities, setCardinalities] = useState({});
  const [displayedCardinalities, setDisplayedCardinalities] = useState({});

  const getNamesFromCodes = (codes, variableName) => {
    let names = codes.map((e) => {
      if (dictionary[variableName] && dictionary[variableName].codes)
        return dictionary[variableName].codes[e];
      return e;
    });
    return names;
  };

  const getCodesFromNames = (names, variableName) => {
    let codes = names.map((e) => {
      if (dictionary[variableName] && dictionary[variableName].codes) {
        const reversedDictionary = Object.entries(
          dictionary[variableName].codes
        ).reduce((ret, entry) => {
          const [key, value] = entry;
          ret[value] = key;
          return ret;
        }, {});
        console.log(dictionary[variableName].codes, reversedDictionary);
        return reversedDictionary[e];
      }
      return e;
    });
    return codes;
  };

  useEffect(() => {
    // everytime a new filter is added
    // fetch the available cardinalities for the variable of the filter
    filters.forEach((filter) => {
      // only
      if (Object.keys(cardinalities).includes(filter.name) || !filter.name)
        return;
      fetch('api/graph/cardinality/' + filter.name)
        .then((res) => res.json())
        .then((data) => {
          setCardinalities({ ...cardinalities, [filter.name]: data });
          let displayedData = getNamesFromCodes(data, filter.name);
          setDisplayedCardinalities({
            ...displayedCardinalities,
            [filter.name]: displayedData,
          });
        });
    });
  }, [filters]);

  const addFilterHandler = () => {
    let unselectedFilters = eligibleFilters.filter((e, i) => {
      return !filters.map((f) => f.name).includes(e);
    });
    if (unselectedFilters.length !== 0)
      setFilters([
        ...filters,
        { name: unselectedFilters[0], cardinalities: [] },
      ]);
  };

  const removeFilterHandler = (i) => {
    let index = i && filters.length - 1;
    let newFilters = filters.filter((e, i) => i !== index);
    setFilters(newFilters);
  };

  const updateFilterName = (filterIndex, filterName) => {
    // const newFilters = filters;
    // console.log(filterIndex, filterName);
    const newFilters = filters.map((filter, i) => {
      if (i === filterIndex) {
        filter.name = filterName;
        filter.cardinalities = [];
      }
      return filter;
    });
    // newFilters[filterIndex].name = filterName;
    // newFilters[filterIndex].cardinalities = [];
    setFilters(newFilters);
  };

  const updateFilterCardinalities = (filterIndex, cardinalities, varName) => {
    const newFilters = filters.map((filter, i) => {
      if (i === filterIndex) {
        filter.cardinalities = getCodesFromNames(cardinalities, varName);
      }
      return filter;
    });

    setFilters(newFilters);
  };

  return (
    <div>
      {filters.map((filter, i) => (
        <div className='flex py-4  justify-between' key={i}>
          <div className='my-auto pr-2' onClick={() => removeFilterHandler(i)}>
            <FilterIcon className='h-5 w-5 text-accent ' />
          </div>
          {/* <div className='font-bold my-auto w-36'>{filter.name}</div> */}
          <div className='my-auto w-36'>
            <ComboBox
              selectedItem={filter.name}
              onItemSelected={({ name }) => {
                updateFilterName(i, name);
              }}
              options={eligibleFilters}
            />
          </div>

          {displayedCardinalities[filter.name] && (
            <div className='my-auto '>
              <MultiSelect
                options={displayedCardinalities[filter.name]}
                onItemSelected={(cardinalities) => {
                  updateFilterCardinalities(i, cardinalities, filter.name);
                }}
              />
            </div>
          )}

          <div className='my-auto pl-2' onClick={() => removeFilterHandler(i)}>
            <TrashIcon className='h-5 w-5 text-accent-darker hover:text-accent cursor-pointer' />
          </div>
        </div>
      ))}
      <div className='btn-sm' onClick={addFilterHandler}>
        Add Filter
      </div>
    </div>
  );
};

export default GraphFilterList;
