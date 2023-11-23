import { Navbar, createStyles, Image, Flex } from '@mantine/core';
import NavbarLinksGroup from './NavbarLinksGroup';
import { useContext } from 'react';
import { Context } from '../../main';
import { IconLogout } from '@tabler/icons-react';


const useStyles = createStyles(() => ({
    navbar: {
        background: '#ffff',
        position: 'sticky',
        top: 0,
        zIndex: 10000,
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
      width={{ base: '268px' }}  
      className={classes.navbar}
      height={'100vh'} 
    >
      <Navbar.Section className={classes.header}>
        123
      </Navbar.Section>

      <Navbar.Section grow className={classes.links}>
        <NavbarLinksGroup/>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Flex align={'center'}>
          Аналитик
          <IconLogout width={16} stroke={1.5} style={{marginLeft: '9px', cursor: 'pointer'}} onClick={() => UStore.logout()}/>
        </Flex>
      </Navbar.Section>
    </Navbar>
    );
};

export default NavbarNested;