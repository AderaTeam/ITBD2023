import { Context } from "../../main";
import { Button, Flex, PasswordInput, Radio, Stack, Text, TextInput, Title } from "@mantine/core";
import { createStyles } from '@mantine/styles'
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const useStyles = createStyles((_theme: any) => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    background: '#EDF2FF'
  },
  card: {
    width: "496px",
    borderRadius: '32px'
  },
  form: {
    background: 'white',
    width: '496px',
    borderRadius: '32px',
    padding: '56px 48px'
  },
  input: {
    width: '100%',
    label: {
      marginBottom: '8px',
    }
  },
  radio: {
    label: {
      paddingLeft: '8px',
      fontSize: '16px'
    }
  }
}));

const AuthPage = observer(function() {
  const { UStore } = useContext(Context);
  const location = useLocation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('analyst');

  const handleAuth = async () => {
    if (location.pathname === '/login') { 
      await UStore.login(email, password)
    } else {
      await UStore.registration(username, email, password, role)
    }
    if (UStore.isAuth) {
      navigate('/')
    }
  };

  return(
    <Flex className={classes.wrapper} align="center" justify="center">
      <Flex className={classes.card}>
        <Stack align="center" spacing={40} className={classes.form}>
          <Title size="h3">{location.pathname === '/login' ? 'Вход' : 'Регистрация'}</Title>
          <Stack spacing={32} w={400}>
            <Stack spacing={24}>
              <Stack spacing={16} align="center">
              <TextInput
                style={location.pathname === '/login' ? {display: 'none'} : {}}
                placeholder="Иванов Иван"
                label="Фамилия Имя"
                lh={'24px'}
                size="lg"
                withAsterisk
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                radius="0.5rem"
                className={classes.input}
              />
              <TextInput
                placeholder="aaa@yandex.ru"
                label="Email"
                lh={'24px'}
                size="lg"
                withAsterisk
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                radius="0.5rem"
                className={classes.input}
              />
              <PasswordInput
                placeholder="Пароль"
                label="Пароль"
                lh={'24px'}
                size="lg"
                withAsterisk
                value={password}
                onChange={e => setPassword(e.target.value)}
                radius="0.5rem"
                className={classes.input}
              />
              </Stack>
              {location.pathname === '/registration' && (
                  <Radio.Group
                    onChange={setRole}
                    value={role}
                    style={{display: 'flex', alignSelf: 'flex-start'}}
                  >
                    <Flex gap={24}>
                      <Radio
                        className={classes.radio}
                        size="md" 
                        color="indigo.7" 
                        value="user" 
                        label="Пользователь"
                      />
                      <Radio
                        className={classes.radio}
                        size="md" 
                        color="indigo.7" 
                        value="analyst" 
                        label="Аналитик"
                      />
                    </Flex>
                  </Radio.Group>
              )}
              <Button 
                fz='lg' 
                className="button"
                fullWidth
                h={51} 
                color="indigo.7"
                disabled={
                  location.pathname === '/login'  
                  ? (email && password) ? false : true
                  : (email && password && username && role) ? false : true
                }
                onClick={handleAuth}
              >
                {location.pathname === '/login' ? 'Вход' : 'Регистрация'}
              </Button>
            </Stack>
            <Flex gap={4} justify={'center'}>
              <Text color="gray.9" lh={'27px'} size="lg">
                {location.pathname === '/login' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
              </Text>
              <NavLink to={location.pathname === '/login' ? '/registration' : '/login'}>
                <Text color="indigo.6" lh={'27px'} size="lg">
                  {location.pathname === '/login' ? 'Зарегистрироваться' : 'Войти'}
                </Text>
              </NavLink>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
});

export default AuthPage;