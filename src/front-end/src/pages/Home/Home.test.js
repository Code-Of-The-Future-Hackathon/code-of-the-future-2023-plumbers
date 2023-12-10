import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home'; // Adjust the import path as needed

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(<Home />);
    // Check if a key element of your component is rendered
    // For example, if your Home component should always render a title, you might do:
    // expect(screen.getByText('Your Expected Title')).toBeInTheDocument();
  });

  // Add more tests here to check for other key elements or behaviors of your Home component
});
