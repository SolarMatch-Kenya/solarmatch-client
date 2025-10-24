import React from 'react';
import styled from 'styled-components';

const Card = ({ icon, heading, step }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              {icon}
              <strong>{heading}</strong>
            </div>
          </div>
          <div className="front">
            <div className="front-content">
              <div className="description">
                <div className="title">
                  <p>
                    <strong>{step}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="img">
              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 280px;
    height: 254px;
    margin: 0 auto;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
  }

  /* --- BACK --- */
  .back {
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .back::before {
    position: absolute;
    content: '';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #ff9966,
      #ff9966,
      #ff9966,
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #ffffff; /* 👈 Light background */
    border-radius: 10px;
    color: #333; /* dark text */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  .back-content strong {
    font-size: 1rem;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  /* --- FRONT --- */
  .front {
    transform: rotateY(180deg);
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .description {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    width: 100%;
    padding: 10px;
    background-color: #fff7f2;
    border-radius: 8px;
  }

  .title {
    font-size: 12px;
    color: #444;
  }

  /* --- CIRCLES (soft glow behind content) --- */
  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ff9966;
    position: relative;
    filter: blur(20px);
    animation: floating 2600ms infinite linear;
    opacity: 60%;
  }

  #bottom {
    background-color: #ff9966;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
    opacity: 10%;
  }

  #right {
    background-color: #ff6633;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export default Card;
