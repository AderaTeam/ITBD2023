import { Navbar, createStyles, Image, Flex } from '@mantine/core';
import NavbarLinksGroup from './NavbarLinksGroup';
import { useContext } from 'react';
import { Context } from '../../main';
import { IconPlus } from '@tabler/icons-react';
import logo from 'shared/assets/logo.svg';
import { Button } from 'shared/components/Buttons';
import { useNavigate } from 'react-router';
import { ANALYSIS_ROUTE } from 'shared/constants/const';

const useStyles = createStyles((theme) => ({
  navbar: {
    background: '#1A1B1E',
    position: 'sticky',
    top: 0,
    zIndex: 10000,
    borderRight: 'none',
  },

  header: {
    padding: '40px 32px 40px',
  },

  button: {
    padding: '0px 32px',
  },

  links: {
    padding: '24px 32px',
  },

  'button-text': {
    color: theme.colors.dark[9],
    display: 'flex',
    alignItems: 'center',
    span: {
      width: '105px',
      marginRight: '8px',
    },
  },

  footer: {
    padding: '0px 32px 40px',
  },
}));

const NavbarNested = () => {
  const { classes } = useStyles();
  const { AStore } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar
      width={{ base: '249px' }}
      className={classes.navbar}
      height={'100vh'}
    >
      <Navbar.Section className={classes.header}>
        <Image src={logo} />
      </Navbar.Section>

      <Navbar.Section className={classes.button}>
        <Button
          onClick={() => {
            AStore.setCurentStep(0);
            navigate(ANALYSIS_ROUTE);
          }}
          color="#ABE85D"
        >
          <div className={classes['button-text']}>
            <span>Создать</span> <IconPlus />
          </div>
        </Button>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links}>
        <NavbarLinksGroup />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Flex align={'center'} style={{ color: '#909296' }}>
          Аналитик
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarNested;
