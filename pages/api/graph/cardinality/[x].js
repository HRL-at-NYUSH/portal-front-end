// sample api call
// fetch('api/graph/cardinality/YEAR')

export default function handler(req, res) {
  const SERVER_HOST = process.env.SERVER_HOST;
  const { x } = req.query;

  if (req.method === 'GET') {
    fetch(
      SERVER_HOST +
        '/card?' +
        new URLSearchParams({
          x: x,
        })
    )
      .then((r) => r.json())
      .then((data) => res.status(200).json(data));
  }
}
