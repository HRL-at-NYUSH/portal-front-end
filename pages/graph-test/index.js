import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

import Plot from '@/components/PlotlyWrapper';
import { Listbox } from '@headlessui/react';
import MyCombobox from '@/components/Combobox';

const GraphTest = () => {
  const SERVER_HOST = 'http://localhost:8888';
  // available x variables (columns)
  const [isLoadingAllVariables, setLoadingAllVariables] = useState(true);
  const [allVariables, setAllVariables] = useState(null);
  const [selectedX, setSelectedX] = useState(null);
  // available x variables (columns)

  const [isLoadingAllXCardinalities, setLoadingAllXCardinalities] =
    useState(true);
  const [allXCardinalities, setAllXCardinalities] = useState(null);
  const [selectedXCardinality, setSelectedXCardinality] = useState(null);

  // selected group from all available x
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [isLoadingAllGraphTypes, setLoadingAllGraphTypes] = useState(true);
  const [allGraphTypes, setAllGraphTypes] = useState(null);
  const [selectedGraphType, setSelectedGraphType] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [graphLayout, setGraphLayout] = useState({ title: 'Graph' });

  // loading all available x variables
  useEffect(() => {
    fetch(SERVER_HOST + '/columns')
      .then((res) => res.json())
      .then((data) => {
        setAllVariables(data);
        setLoadingAllVariables(false);
      });
    fetch(SERVER_HOST + '/graph-types')
      .then((res) => res.json())
      .then((data) => {
        setAllGraphTypes(data);
        setLoadingAllGraphTypes(false);
      });
  }, []);

  // when x selected, loading all cardinalities available for that variable
  useEffect(() => {
    console.log('selectedX', selectedX);
    if (selectedX && selectedX.name) {
      fetch(SERVER_HOST + '/card?x=' + selectedX.name)
        .then((res) => res.json())
        .then((data) => {
          setAllXCardinalities(data);
          setLoadingAllXCardinalities(false);
          console.log(data);
        });
    }
  }, [selectedX]);

  // when specific cardinality selected
  useEffect(() => {
    console.log('selected cardinalities', selectedX, selectedXCardinality);
  }, [selectedXCardinality]);

  // once create graph button clicked, request needed data
  const onCreateGraph = () => {
    if (
      selectedX &&
      selectedX.name &&
      selectedGraphType &&
      selectedGraphType.name
    ) {
      let url =
        SERVER_HOST + '/' + selectedGraphType.route + '?x=' + selectedX.name;
      if (selectedGroup && selectedGroup.name)
        url += '&group=' + selectedGroup.name;
      console.log('requesting', url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          // reformat data to be plug in to plotly
          data = Object.keys(data).map((traceName) => ({
            x: data[traceName].x,
            y: data[traceName].y,
            name: traceName,
            type: selectedGraphType.route,
          }));
          setGraphLayout({
            ...graphLayout,
            title: `${selectedGraphType.name}: ${selectedX.name} - Grouped by ${selectedGroup.name}`,
          });
          setGraphData(data);
        });
    }
  };

  return (
    <div>
      <Head>
        <title>Humanity Research Lab</title>
        <meta name='description' content='Projects' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='relative pt-16  md:pt-20 '>
        <div className='text-center pb-12 md:pb-16 '>
          <h1
            className='mx-auto font-extrabold leading-tighter tracking-tighter mb-4'
            data-aos='zoom-y-out'
          >
            Graph Test
          </h1>
        </div>
      </section>

      {/* graph section */}
      <section className='grid grid-cols-12 max-w-6xl m-auto min-h-max'>
        {/* sidebar control */}
        <div className='col-span-4'>
          {/* variable selection */}
          <h4>X Variable</h4>
          <div className='py-2'>
            {!isLoadingAllVariables ? (
              <MyCombobox passSelected={setSelectedX} options={allVariables} />
            ) : null}
          </div>
          <h4>Grouping</h4>
          <div className='py-2'>
            {!isLoadingAllVariables ? (
              <MyCombobox
                passSelected={setSelectedGroup}
                options={allVariables}
              />
            ) : null}
          </div>

          <h4>Graph Type</h4>
          <div className='py-4'>
            {!isLoadingAllGraphTypes ? (
              <MyCombobox
                passSelected={setSelectedGraphType}
                options={allGraphTypes}
              />
            ) : null}
          </div>
          {/* <h4>X Cardinality</h4>
          <div className='py-2'>
            {!isLoadingAllXCardinalities ? (
              <MyCombobox
                passSelected={setSelectedXCardinality}
                options={allXCardinalities}
              />
            ) : null}
          </div> */}

          <div className='btn' onClick={onCreateGraph}>
            Create Graph
          </div>
        </div>
        <div className='col-span-8'>
          <Plot
            data={graphData ? graphData : null}
            layout={graphLayout}
            config={{ responsive: true }}
          />
        </div>
      </section>

      <footer></footer>
    </div>
  );
};

export default GraphTest;
