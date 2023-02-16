import { ButtonStyle, ButtonStyleType } from "./styles";

export type ButtonPropsType = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonStyleType;
  styles?: string;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function Button({
  children,
  styles = "",
  type = "basic",
  onClick,
  attributes,
}: ButtonPropsType) {
  return (
    <button
      {...attributes}
      onClick={onClick}
      className={`flex flex-col justify-center ${ButtonStyle[type]} ${styles}`}
    >
      {children}
    </button>
  );
}
