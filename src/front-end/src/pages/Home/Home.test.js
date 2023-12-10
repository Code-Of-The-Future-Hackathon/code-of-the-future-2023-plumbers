import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home'; // Adjust the import path as needed

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('home-container')).toBeInTheDocument();
  });

  test('renders GreenPlacesCarousel', () => {
    render(<Home />);
    expect(screen.getByTestId('green-places-carousel')).toBeInTheDocument();
  });

  test('renders three GreenStatsCards', () => {
    render(<Home />);
    const statsCards = screen.getAllByTestId('green-stats-card');
    expect(statsCards.length).toBe(3);
  });
});
