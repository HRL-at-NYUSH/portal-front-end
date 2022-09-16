import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import GraphConfigurator from 'pages/graph-test/components/graphConfigurator';
import Plot from '@/components/PlotlyWrapper';
import parsePlotlyData from 'pages/graph-test/utils/parsePlotlyData';
import { Input, Grid } from "@nextui-org/react";


const GraphApiTest = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [graphConfig, setGraphConfig] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [graphLayout, setGraphLayout] = useState({ 
    title: 'Graph',
    height: 650,
    anchor: 'free',
    xaxis: { 
      automargin: true,
      showgrid: true,
      showticklabels: true },
 });
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    fetch('api/graph/variableDictionary')
      .then((res) => res.json())
      .then((data) => setDictionary(data));
  }, []);

  const onCreateGraph = (graphConfig) => {
    const { graphType, variable, group, filters } = graphConfig;

    fetch('api/graph', {
      method: 'POST',
      body: JSON.stringify(graphConfig),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('raw response from backend', data);
        data = parsePlotlyData(data, graphConfig, dictionary);
        let title = `${graphType.name}: ${variable.name}`;
        if (group && group.name) title += ` - Grouped by ${group.name}`;
        setGraphLayout({
          ...graphLayout,
          title: title,
        });
        setGraphData(data);
        console.log('parsed data for plotly', data);
      });
  };

  return (
    <div>
      <Head>
        <title>Humanity Research Lab</title>
        <meta name='description' content='Projects' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className="min-h-screen">
      <section className='flex relative mt-16 mx-20 bg-white rounded-lg shadow' data-aos='zoom-y-out'>
        <div className='flex-1 text-left pb-12 md:py-6 px-12'>
          <h1 className='text-3xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
            Project Name
          </h1>
          <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div class="mt-2 flex items-center text-sm text-gray-500">
          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
            <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
          </svg>
            Last Opened Yesterday at 11:32PM
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
            File Size: 5.32MB
          </div>
          </div>
        </div>

        <div class="flex pb-12 md:py-6 px-12">
          <span class="hidden sm:block">
            <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accent">
              <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Rename
            </button>
          </span>

          <span class="hidden sm:block ml-3">
            <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accent">
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
              Save
            </button>
          </span>

          <span class="sm:ml-3">
            <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-darker focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accent">
              <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Download
            </button>
          </span>
        </div>
      </section>

      <section className='h-2/3 grid grid-cols-12 mx-20 mt-4' data-aos='zoom-y-out'>
        {/* sidebar control */}
        <div className='col-span-4'>
          <GraphConfigurator
            onCreateGraph={onCreateGraph}
            dictionary={dictionary}
          ></GraphConfigurator>
        </div>
        <div className='col-span-8 ml-4 p-2 bg-white rounded-lg shadow'>
          <Plot
            className='w-full h-full'
            data={graphData ? graphData : null}
            layout={graphLayout}
            config={{ responsive: true }}
          />
        </div>
      </section>
      </div>
      <footer></footer>
    </div>
  );
};

export default GraphApiTest;
