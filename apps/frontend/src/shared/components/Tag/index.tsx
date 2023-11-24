import style from './Tag.module.scss';

interface Props {
  text: string;
}

export const Tag = ({ text }: Props) => {
  return <div className={style.tag}>{text}</div>;
};
