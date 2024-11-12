import { FC } from "react";

interface CardProps {
  children: React.ReactNode;
}

export const Card: FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};
