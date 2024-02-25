import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage/LandingPage';

describe('LandingPage component', () => {
  it('renders welcome message and button', () => {
    render(<LandingPage />);
    // Verifica que el componente renderice el mensaje de bienvenida
    expect(screen.getByText('Welcome to the Canine Universe')).toBeInTheDocument();
    // Verifica que el componente renderice el mensaje de exploración
    expect(screen.getByText('Explore the World of Dogs!')).toBeInTheDocument();
    // Verifica que el componente renderice el botón
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    // Verifica que el botón tenga el enlace correcto
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
  });
});