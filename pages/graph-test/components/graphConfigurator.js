import { useEffect, useState, useCallback } from 'react';
import MyCombobox from '@/components/Combobox';
import GraphFilter from './GraphFilter';

const GraphConfigurator = ({ onChange, onCreateGraph }) => {
  // to store all available options fetched from server
  const [graphOptions, setGraphOptions] = useState({
    allGraphTypes: null,
    eligibleVariables: null,
    eligibleFilters: null,
    varDict: null,
  });

  // to store user input selections
  const [selectedGraphType, setSelectedGraphType] = useState(null);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const getGraphConfig = () => {
    return {
      graphType: selectedGraphType,
      variable: selectedVariable,
      group: selectedGroup,
      filters: selectedFilters,
    };
  };

  const addFilter = () => {
    const num = selectedFilters.length;
    const newFilter = {
      name: graphOptions.eligibleFilters[num],
      range: [],
    };
    let newFilters = [...selectedFilters, newFilter];
    setSelectedFilters(newFilters);
  };

  const removeFilter = (filterIndex) => {
    const newFilters = filters.filter((_, index) => index !== filterIndex);
    setSelectedFilters(newFilters);
  };

  const updateFilter = (filterIndex, value) => {
    const newFilter = value;
    let newFilters = selectedFilters.map((filter, index) => {
      return index === filterIndex ? newFilter : filter;
    });
    setSelectedFilters(newFilters);
  };

  // load available graph types when mounted
  useEffect(() => {
    fetch('api/graph/graphType/')
      .then((res) => res.json())
      .then((data) => {
        setGraphOptions({
          ...graphOptions,
          allGraphTypes: data,
        });
      });
  }, []);

  // load eligible variables for the graph type when selected/changed
  useEffect(() => {
    if (selectedGraphType)
      fetch('api/graph/eligibleVariables/' + selectedGraphType.route)
        .then((res) => res.json())
        .then((data) => {
          setGraphOptions({
            ...graphOptions,
            eligibleVariables: data,
          });
        });
  }, [selectedGraphType]);

  // load eligible filters for the main variable when selected/changed
  useEffect(() => {
    if (selectedVariable && selectedVariable.name)
      fetch('api/graph/eligibleFilters/' + selectedVariable.name)
        .then((res) => res.json())
        .then((data) => {
          setGraphOptions({
            ...graphOptions,
            eligibleFilters: data,
          });
        });
  }, [selectedVariable]);

  return (
    <section className=''>
      {/* <div>Graph Options</div>
      <div>{JSON.stringify(graphOptions)}</div> */}
      {/* <div>Graph Config</div>
      <div>{JSON.stringify(getGraphConfig())}</div> */}

      {/* when graph types are fetched, provide selectbox */}
      {graphOptions.allGraphTypes && (
        <div>
          <h4>Graph Type</h4>
          <div className='py-4'>
            <MyCombobox
              onItemSelected={setSelectedGraphType}
              options={graphOptions.allGraphTypes}
            />
          </div>
        </div>
      )}

      {/* when eligible variables are fetched, provide selectbox */}
      {graphOptions.eligibleVariables && (
        <div>
          <h4>X Variable</h4>
          <div className='py-4'>
            <MyCombobox
              onItemSelected={setSelectedVariable}
              options={graphOptions.eligibleVariables}
            />
          </div>
        </div>
      )}

      {/* {graphOptions.eligibleVariables && (
        <div className='btn' onClick={onCreateGraph}>
          Create Graph
        </div>
      )} */}

      {graphOptions.eligibleFilters && (
        <div>
          <h4>Grouping</h4>
          <div className='py-4'>
            <MyCombobox
              onItemSelected={setSelectedGroup}
              options={graphOptions.eligibleFilters}
            />
          </div>
        </div>
      )}

      {graphOptions.eligibleFilters &&
        selectedFilters.map((filter, i) => (
          <div key={i}>
            <h4>Filter {i + 1}</h4>
            <h4>{filter.name}</h4>
            <div className='py-4'>
              <MyCombobox
                onItemSelected={(e) => {
                  updateFilter(i, e);
                }}
                options={graphOptions.eligibleFilters}
              />
            </div>
          </div>
        ))}

      {graphOptions.eligibleFilters && (
        <div className='btn' onClick={addFilter}>
          Add Filter
        </div>
      )}
      <div className='btn' onClick={() => onCreateGraph(getGraphConfig())}>
        Create Graph
      </div>
    </section>
  );
};

export default GraphConfigurator;
