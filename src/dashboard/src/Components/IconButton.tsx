import Icon, { IconPropsType } from "./Icon";
import { ButtonStyle, ButtonStyleType } from "./styles";

type IconButtonPropsType = IconPropsType & {
  onClick?: () => void;
  type?: ButtonStyleType;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function IconButton({
  name,
  fill = false,
  styles = "",
  type = "basic",
  attributes,
  onClick,
}: IconButtonPropsType) {
  return (
    <button
      {...attributes}
      onClick={onClick}
      className={`flex flex-col justify-center ${ButtonStyle[type]} ${styles}`}
    >
      <Icon name={name} fill={fill} styles={styles} />
    </button>
  );
}
