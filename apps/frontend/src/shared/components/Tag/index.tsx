import style from './Tag.module.scss';

interface Props {
  text: string;
  w?: string;
  h?: string;
  p?: string;
  center?: boolean;
  children?: React.ReactNode;
  color?: string;
}

export const Tag = ({ text, w, h, p, center, children, color }: Props) => {
  return (
    <div
      style={{
        width: w,
        height: h,
        padding: p,
        justifyContent: center ? 'center' : 'flex-start',
        background: color,
        color: color && '#C1C2C5',
      }}
      className={style.tag}
    >
      {children ? children : text}
    </div>
  );
};
