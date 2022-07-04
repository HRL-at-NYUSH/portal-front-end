import { useEffect, useState, useCallback } from 'react';
import ComboBox from '@/components/Combobox';
import GraphFilterList from './graphFilterList';

const GraphConfigurator = ({ onChange, onCreateGraph, dictionary }) => {
  // to store all available options fetched from server
  const [graphOptions, setGraphOptions] = useState({
    allGraphTypes: null,
    eligibleVariables: null,
    eligibleFilters: null,
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
        <div className='flex py-4'>
          <div className='font-bold my-auto w-36'>Graph Type</div>
          <div className='m-auto'>
            <ComboBox
              onItemSelected={setSelectedGraphType}
              options={graphOptions.allGraphTypes}
            />
          </div>
        </div>
      )}

      {/* when eligible variables are fetched, provide selectbox */}
      {graphOptions.eligibleVariables && (
        <div className='flex py-4'>
          <div className='font-bold my-auto w-36'>Main Variable</div>
          <div className='m-auto'>
            <ComboBox
              onItemSelected={setSelectedVariable}
              options={graphOptions.eligibleVariables}
            />
          </div>
        </div>
      )}

      {/* grouping */}
      <hr className='my-4'></hr>
      {graphOptions.eligibleFilters && (
        <div className='flex py-4'>
          <div className='font-bold my-auto w-36'>Grouping</div>
          <div className='m-auto'>
            <ComboBox
              onItemSelected={setSelectedGroup}
              options={graphOptions.eligibleFilters}
            />
          </div>
        </div>
      )}

      {/* filtering */}
      {/* {graphOptions.eligibleFilters &&
        selectedFilters.map((filter, i) => (
          <div className='flex py-4' key={i}>
            <div className='font-bold my-auto w-36'>Filter {i + 1}</div>
            <div className='m-auto'>
              <ComboBox
                onItemSelected={setSelectedGroup}
                options={graphOptions.eligibleFilters}
              />
            </div>
            <div className='m-auto'>
              <ComboBox
                onItemSelected={setSelectedGroup}
                options={graphOptions.eligibleFilters}
              />
            </div>
          </div>
        ))} */}

      {graphOptions.eligibleFilters && (
        <GraphFilterList
          eligibleFilters={graphOptions.eligibleFilters}
          filters={selectedFilters}
          setFilters={setSelectedFilters}
          dictionary={dictionary}
        ></GraphFilterList>
      )}

      <hr className='my-4'></hr>

      <div className='btn' onClick={() => onCreateGraph(getGraphConfig())}>
        Create Graph
      </div>
    </section>
  );
};

export default GraphConfigurator;
