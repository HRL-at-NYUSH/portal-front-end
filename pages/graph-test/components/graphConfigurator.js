import { useEffect, useState, useCallback } from 'react';
import ComboBox from '@/components/Combobox';
import GraphFilterList from './graphFilterList';
import { Container, Row, Col } from '@nextui-org/react';


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
    <section className='bg-white rounded-lg shadow p-10 h-full'>
      {/* <div>Graph Options</div>
      <div>{JSON.stringify(graphOptions)}</div> */}
      {/* <div>Graph Config</div>
      <div>{JSON.stringify(getGraphConfig())}</div> */}

      {/* when graph types are fetched, provide selectbox */}
      {graphOptions.allGraphTypes && (
        <div className='flex py-2'>
          <div className='flex items-center text-lg wl-2 font-bold my-auto w-36'>
            <svg class="flex-shrink-0 mr-2 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Graph Type
          </div>
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
        <div className='flex py-2'>
           <div className='flex items-center text-lg wl-2 font-bold my-auto w-36'>
            <svg class="flex-shrink-0 mr-2 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clip-rule="evenodd" />
            </svg>
            Main Variable
          </div>
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
        <div className='flex py-2'>
              <div className='flex items-center text-lg wl-2 font-bold my-auto w-36'>
            <svg class="flex-shrink-0 mr-2 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
              <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            Grouping
          </div>
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
