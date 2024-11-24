import { FC } from 'react';

interface InfoProps {
  name: string;
  description: string;
  location: string;
}

export const Info: FC<InfoProps> = ({ location, name, description }) => (
  <div className="info">
    <h1 className="name text-preset-1">{name}</h1>
    <h2 className="location text-preset-2-bold">{location}</h2>
    <p className="name text-preset-2">{description}</p>
  </div>
);
