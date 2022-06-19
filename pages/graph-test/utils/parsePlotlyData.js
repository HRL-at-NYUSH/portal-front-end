const parsePlotlyData = (data, graphConfig, dictionary) => {
  const { graphType, variable, group, filters } = graphConfig;

  // reformat json
  data = Object.keys(data).map((traceName) => ({
    x: data[traceName].x,
    y: data[traceName].y,
    name: traceName,
    type: graphType.route,
  }));

  // lookup in dictionary
  data = data.map((trace) => {
    // parser for bar chart
    if (trace.type === 'bar') {
      // if this main variable is codified
      if (dictionary[variable.name] && dictionary[variable.name].codes)
        trace.x = trace.x.map((x) => {
          if (dictionary[variable.name].codes[x] !== undefined)
            return dictionary[variable.name].codes[x];
          return x;
        });

      // if this group variable is codified
      if (group.name && dictionary[group.name] && dictionary[group.name].codes)
        trace.name = dictionary[variable.name].codes[trace.name];

      trace.type = 'bar';
    }

    // parser for line graph
    if (trace.type === 'line') {
      // if this main variable is codified
      if (dictionary[variable.name] && dictionary[variable.name].codes)
        trace.x = trace.x.map((x) => {
          if (dictionary[variable.name].codes[x] !== undefined)
            return dictionary[variable.name].codes[x];
          return x;
        });

      // if this group variable is codified
      if (
        group.name &&
        dictionary[group.name] &&
        dictionary[group.name].codes
      ) {
        console.log(trace.name, group.name);
        trace.name = dictionary[group.name].codes[trace.name];
      }

      trace.type = 'scatter';
    }

    // parser for area graph
    if (trace.type === 'area') {
      trace.name = dictionary[variable.name].codes[trace.name];
      trace.type = 'scatter';
    }
    return trace;
  });
  return data;
};

export default parsePlotlyData;
