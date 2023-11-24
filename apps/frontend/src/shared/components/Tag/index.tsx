import style from './Tag.module.scss';

interface Props {
  text: string;
  w?: string;
  h?: string;
  p?: string;
  center?: boolean;
  children?: React.ReactNode;
}

export const Tag = ({ text, w, h, p, center, children }: Props) => {
  return (
    <div
      style={{
        width: w,
        height: h,
        padding: p,
        justifyContent: center ? 'center' : 'flex-start',
      }}
      className={style.tag}
    >
      {children ? children : text}
    </div>
  );
};
