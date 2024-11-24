import { FC } from 'react';

interface ButtonListProps {
  links: Array<{ name: string; url: string }>;
}

export const ButtonList: FC<ButtonListProps> = ({ links }) => (
  <div className="button">
    <ul>
      {links.map((link) => (
        <li key={link.name}>
          <a
            className="text-preset-2-bold"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
