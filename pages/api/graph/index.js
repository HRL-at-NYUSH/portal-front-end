export default function handler(req, res) {
  const SERVER_HOST = process.env.SERVER_HOST;

  // parsing graph configs
  const { graphType, variable, group, filters } = JSON.parse(req.body);

  if (!graphType || !variable)
    //not enough data
    res.status(400);

  let params = { var: variable.name };
  if (group && group.name) params['group'] = group.name;

  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      const variable = filter.name;
      const range = filter.range;
      params[variable] = range;
    });
  }

  console.log(
    SERVER_HOST + `/${graphType.route}?` + new URLSearchParams(params)
  );
  if (req.method === 'POST') {
    fetch(SERVER_HOST + `/${graphType.route}?` + new URLSearchParams(params))
      .then((r) => r.json())
      .then((data) => res.status(200).json(data));
  } else {
    // Handle any other HTTP method
    res.status(200).json({ hello: process.env.HOSTNAME });
  }
}
