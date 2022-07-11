// request graph after parsing the graph configs into http request
export default function handler(req, res) {
  const SERVER_HOST = process.env.SERVER_HOST;

  // parsing graph configs
  const { graphType, variable, group, filters } = JSON.parse(req.body);

  if (!graphType || !variable)
    //not enough data
    res.status(400);

  let params = { var: variable.name };
  if (group && group.name) params['group'] = group.name;

  let filterParams = '';
  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      if (filter.cardinalities.length === 0) return;
      const variable = filter.name;
      const range = filter.cardinalities;
      range.forEach((r) => {
        filterParams += `&${variable}=${r}`;
      });
      // params[variable] = range.toString();
    });
  }

  console.log(
    SERVER_HOST +
      `/${graphType.route}?` +
      new URLSearchParams(params) +
      filterParams
  );
  if (req.method === 'POST') {
    fetch(
      SERVER_HOST +
        `/${graphType.route}?` +
        new URLSearchParams(params) +
        filterParams
    )
      .then((r) => r.json())
      .then((data) => res.status(200).json(data));
  } else {
    // Handle any other HTTP method
    res.status(200).json({ hello: process.env.HOSTNAME });
  }
}
