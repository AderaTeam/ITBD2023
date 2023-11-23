import { Textarea } from "@mantine/core"
import style from './TextArea.module.scss';

interface Props {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextArea = ({onChange}: Props) => {

  return (
    <Textarea
      onChange={onChange}
      placeholder="Введите обращение"
      className={style.textarea}
      variant="filled"
    />
  )
}