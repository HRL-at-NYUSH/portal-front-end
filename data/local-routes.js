import Description from 'pages/data-report/components/Description';
import DataSources from 'pages/data-report/components/DataSources';
import DatasetProduction from 'pages/data-report/components/DatasetProduction';
import Variables from 'pages/data-report/components/Variables';


const localroutes = [
    { href: '/description', title: 'Description', component: Description },
    { href: '/data-sources', title: 'DataSources', component: DataSources },
    {
      href: '/dataset-production',
      title: 'DatasetProduction',
      component: DatasetProduction,
    },
    { href: '/variables', title: 'Variables', component: Variables },
  ];

  export default localroutes;