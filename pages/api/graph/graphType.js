// [
//   { id: '0', name: 'Bar Chart', route: 'bar' },
//   { id: '1', name: 'Line Chart', route: 'line' },
// ];

export default function handler(req, res) {
  const SERVER_HOST = process.env.SERVER_HOST;
  if (req.method === 'GET') {
    fetch(SERVER_HOST + '/graph-types')
      .then((r) => r.json())
      .then((data) => res.status(200).json(data));
  }
}
