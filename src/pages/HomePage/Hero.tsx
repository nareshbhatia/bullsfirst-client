import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/bullsfirst-logo.svg';
import popsicle from '../../assets/popsicle.png';
import { HorizontalContainer } from '../../components';
import './Hero.css';

export const Hero = () => {
  const navigate = useNavigate();

  /* istanbul ignore next */
  const handleSignIn = async () => {
    navigate('/signin');
  };

  return (
    <div data-testid="home-hero" className="bg-neutral-light py-4">
      <div className="hero_container container">
        <HorizontalContainer className="justify-between items-center">
          <img src={logo} alt="logo" width="190" />
          <img
            src={popsicle}
            alt="popsicle"
            height="200px"
            className="hero__popsicle"
          />
          <button
            className="btn-sm mt-2"
            aria-label="Sign in"
            type="submit"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </HorizontalContainer>
        <p className="hero__slogan">
          Get better results with Bullsfirst at the helm of your portfolio.
        </p>
      </div>
    </div>
  );
};
