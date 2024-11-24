import { FC } from 'react';

interface AvatarProps {
  url: string;
  alt: string;
}

export const Avatar: FC<AvatarProps> = () => (
  <div className="avatar">
    <img src="/src/assets/images/avatar-jessica.jpeg" alt="avatar" />
  </div>
);
