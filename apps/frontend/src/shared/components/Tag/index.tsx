import style from './Tag.module.scss';

interface Props {
  text: string;
  w?: string;
  h?: string;
  p?: string;
  center?: boolean;
  children?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export const Tag = ({
  text,
  w,
  h,
  p,
  center,
  children,
  color,
  onClick,
}: Props) => {
  const isLink = onClick ? true : false;

  return (
    <div
      onClick={onClick}
      style={{
        cursor: isLink ? 'pointer' : '',
        width: w,
        height: h,
        padding: p,
        justifyContent: center ? 'center' : 'flex-start',
        background: color,
        color: color && '#C1C2C5',
      }}
      className={isLink ? style['hover-tag'] : style.tag}
    >
      {children ? children : text}
    </div>
  );
};
