import { FC } from 'react';

interface AvatarProps {
  url: string;
  alt: string;
}

export const Avatar: FC<AvatarProps> = ({ alt, url }) => (
  <div className="avatar">
    <img src={url} alt={alt} />
  </div>
);
