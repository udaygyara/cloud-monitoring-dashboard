import React, { useEffect, useState } from "react";

function Dashboard() {

  const [metrics, setMetrics] = useState([]);

  const API_URL = "https://wdxykg3rzk.execute-api.us-east-1.amazonaws.com/prod/metrics";

  useEffect(() => {

  const fetchData = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setMetrics(data))
      .catch(error => console.error("Fetch Error:", error));
  };

  fetchData();

  const interval = setInterval(fetchData, 5000);

  return () => clearInterval(interval);

}, []);

  const latest = metrics.length > 0 ? metrics[metrics.length - 1] : null;

  return (

    <div className="container mt-5">

      <h1 className="text-center text-primary mb-4">
        Cloud Resource Monitoring Dashboard
      </h1>

      {latest && (

        <div className="row mb-4">

          <div className="col-md-4">

            <div className="card shadow">

              <div className="card-body">

                <h5>CPU Usage</h5>

                <h2>{latest.cpu}%</h2>

                <div className="progress">

                  <div
                    className="progress-bar bg-danger"
                    style={{ width: `${latest.cpu}%` }}
                  >
                    {latest.cpu}%
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow">

              <div className="card-body">

                <h5>Memory Usage</h5>

                <h2>{latest.memory}%</h2>

                <div className="progress">

                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${latest.memory}%` }}
                  >
                    {latest.memory}%
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow">

              <div className="card-body">

                <h5>Network Usage</h5>

                <h2>{latest.network}</h2>

                <div className="progress">

                  <div
                    className="progress-bar bg-info"
                    style={{ width: `${latest.network}%` }}
                  >
                    {latest.network}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      <div className="card shadow">

        <div className="card-body">

          <h3>EC2 Instance Metrics</h3>

          <table className="table table-striped table-hover">

            <thead className="table-dark">

              <tr>

                <th>Instance ID</th>
                <th>CPU (%)</th>
                <th>Memory (%)</th>
                <th>Network</th>
                <th>Timestamp</th>

              </tr>

            </thead>

            <tbody>

              {metrics.map((item, index) => (

                <tr key={index}>

                  <td>{item.instanceId}</td>
                  <td>{item.cpu}</td>
                  <td>{item.memory}</td>
                  <td>{item.network}</td>
                  <td>{item.timestamp}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;