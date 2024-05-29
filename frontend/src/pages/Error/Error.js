import React from "react";
import { useNavigate } from "react-router-dom";
function Error() {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="btn btn-secondary"
          >
            Go Home
          </button>{" "}
          <button
            onClick={() => navigate(-1, { replace: true })}
            className="btn btn-outline-dark"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
