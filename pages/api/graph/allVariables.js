// sample api call
// fetch('api/graph/allVariables')

export default function handler(req, res) {
  const SERVER_HOST = process.env.SERVER_HOST;

  if (req.method === 'GET') {
    fetch(SERVER_HOST + '/columns')
      .then((r) => r.json())
      .then((data) => res.status(200).json(data));
  }
}
