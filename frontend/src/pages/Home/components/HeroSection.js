import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function HeroSection() {
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt">
                  <h1>
                    The Best of Nature <br />
                    <span clsas="d-block">From The Hive</span>
                  </h1>
                  <br />
                  <br />
                  <br />
                  <p>
                    <a href="/products">
                      <button className="btn btn-warning me-2 rounded-pill">
                        Explore <ArrowOutwardIcon fontSize="small" />
                      </button>
                    </a>

                    <a
                      href="https://www.instagram.com/propolis.lb.official/"
                      target="blank"
                    >
                      <button
                        className="btn btn-outline-danger flex align-items-center rounded-pill "
                        target="blank"
                      >
                        Join the Fun!
                      </button>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
