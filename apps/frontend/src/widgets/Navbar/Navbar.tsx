import { Navbar, createStyles, Image, Flex } from '@mantine/core';
import NavbarLinksGroup from './NavbarLinksGroup';
import { useContext } from 'react';
import { Context } from '../../main';
import { IconLogout } from '@tabler/icons-react';
import logo from 'shared/assets/logo.svg';

const useStyles = createStyles(() => ({
  navbar: {
    background: '#1A1B1E',
    position: 'sticky',
    top: 0,
    zIndex: 10000,
    borderRight: 'none',
  },

  header: {
    padding: '40px 32px 0px',
  },

  links: {
    padding: '40px 32px',
  },

  footer: {
    padding: '0px 32px 40px'
  },
}));

const NavbarNested = () => {
  const { classes } = useStyles();
  const { UStore } = useContext(Context);

  return (
    <Navbar
      width={{ base: '249px' }}  
      className={classes.navbar}
      height={'100vh'} 
    >
      <Navbar.Section className={classes.header}>
        <Image src={logo}/>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links}>
        <NavbarLinksGroup/>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Flex align={'center'} style={{color: '#909296'}}>
          Аналитик
          <IconLogout 
            width={16} 
            stroke={1.5} 
            style={{marginLeft: '9px', cursor: 'pointer'}} 
            onClick={() => UStore.logout()}
            color='#2C2E33'
          />
        </Flex>
      </Navbar.Section>
    </Navbar>
    );
};

export default NavbarNested;