import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import GraphConfigurator from 'pages/graph-test/components/graphConfigurator';
import Plot from '@/components/PlotlyWrapper';
import parsePlotlyData from 'pages/graph-test/utils/parsePlotlyData';

const GraphApiTest = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [graphConfig, setGraphConfig] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [graphLayout, setGraphLayout] = useState({ title: 'Graph' });
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
        console.log(data);
        data = parsePlotlyData(data, graphConfig, dictionary);
        let title = `${graphType.name}: ${variable.name}`;
        if (group.name) title += ` - Grouped by ${group.name}`;
        setGraphLayout({
          ...graphLayout,
          title: title,
        });
        setGraphData(data);
        console.log(data);
      });
  };

  return (
    <div>
      <Head>
        <title>Humanity Research Lab</title>
        <meta name='description' content='Projects' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='relative pt-16 md:pt-20 '>
        <div className='text-center pb-12 md:pb-16 '>
          <h1
            className='mx-auto font-extrabold leading-tighter tracking-tighter mb-4'
            data-aos='zoom-y-out'
          >
            Graph Test
          </h1>
        </div>
      </section>

      <section className='grid grid-cols-12 max-w-6xl m-auto min-h-max mb-64'>
        {/* sidebar control */}
        <div className='col-span-4'>
          <GraphConfigurator onCreateGraph={onCreateGraph}></GraphConfigurator>
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

export default GraphApiTest;
