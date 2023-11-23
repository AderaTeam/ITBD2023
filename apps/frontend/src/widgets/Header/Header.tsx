import { Text, Flex } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { IconLogout } from '@tabler/icons-react';
import { authRoutes } from "shared/constants/routes";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../main";
import style from './Header.module.scss';

const Header = () => {
  const { UStore } = useContext(Context);

  return (
    <Flex className={style['header-wrapper']}>
      <Flex className={style.container}>
        <NavLink to={'/'}>
          123
        </NavLink>
        <Flex className={style['navbar-wrapper']}>
          {authRoutes.map(item => {
            if (item.title !== 'Главная страница' && item.title !== 'Тестирование' 
            && item.title !== 'Результат тестирования' && !item.isAdmin) {
              return (
                <NavLink className={style['nav-item']} to={item.path} key={item.path}>
                  <Text size={'md'} lh={'24px'}>{item.title}</Text>
                </NavLink>
              )
            }
          })}
        </Flex>
        <Flex style={{marginLeft: 'auto'}}>
          <IconLogout 
            style={{marginLeft: '8px', cursor: 'pointer'}} 
            onClick={() => UStore.logout()} 
            width={18} height={18} 
            stroke={1.5} 
            color="#343A40"
          />
        </Flex>
      </Flex>
  </Flex>
  );
};

export default observer(Header);