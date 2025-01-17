import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileImageField } from '../../../src/components/Profile';
import '@testing-library/jest-dom/extend-expect';

const MockProfileComponent = ({ noUserImage, mockClientProfile }) => {
  if (!noUserImage) {
    localStorage.setItem('profileImage', 'https://example.com/user.png');
  }
  return <ProfileImageField clientProfile={mockClientProfile} />;
};

describe('ProfileImageField', () => {
  it('renders Choose Img button and PersonIcon if clientProfile is null and user has no profile img', () => {
    const { queryByRole, queryByTestId } = render(
      <MockProfileComponent noUserImage mockClientProfile={null} />
    );
    const buttonElement = queryByRole('button');
    expect(buttonElement.textContent).toBe('Choose Img');

    const svgElement = queryByTestId('PersonIcon');
    expect(svgElement).not.toBeNull();
  });

  it('renders Remove Img button and image if clientProfile is null, but user has profile image', () => {
    const { queryByRole, queryByTestId } = render(
      <MockProfileComponent mockClientProfile={null} />
    );
    const buttonElement = queryByRole('button');
    expect(buttonElement.textContent).toBe('Remove Img');

    const muiAvatar = queryByRole('img');
    expect(muiAvatar).toHaveAttribute('src', 'https://example.com/user.png');

    const svgElement = queryByTestId('PersonIcon');
    expect(svgElement).toBeNull();
  });

  it('renders no button with PersonIcon if clientProfile is not null and has no profile image', () => {
    const { queryByRole, queryByTestId } = render(<MockProfileComponent mockClientProfile={{}} />);
    const buttonElement = queryByRole('button');
    expect(buttonElement).toBeNull();

    const svgElement = queryByTestId('PersonIcon');
    expect(svgElement).not.toBeNull();
  });

  it('renders no button with image if clientProfile is not null and has profile image', () => {
    const mockClientProfile = { profileImg: 'https://example.com/client.png' };
    const { queryByRole, queryByTestId } = render(
      <MockProfileComponent mockClientProfile={mockClientProfile} />
    );
    const buttonElement = queryByRole('button');
    expect(buttonElement).toBeNull();

    const muiAvatar = queryByRole('img');
    expect(muiAvatar).toHaveAttribute('src', 'https://example.com/client.png');

    const svgElement = queryByTestId('PersonIcon');
    expect(svgElement).toBeNull();
  });
});
