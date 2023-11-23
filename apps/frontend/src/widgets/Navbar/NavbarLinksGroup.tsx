import { createStyles, Flex, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { authRoutes } from "shared/constants/routes";
interface styleProps {
	location: string,
	path: string
}

const useStyles = createStyles((theme, {location, path}: styleProps) => ({
	link: {
		width: '204px',
		borderRadius: '12px',
		padding: '12px 18px',
		transition: 'all 0.2s',
		color: location === path ? theme.colors.dark[9] : theme.colors.dark[0],
		svg: {
			color:  location === path ? theme.colors.dark[9] : theme.colors.dark[0],
			transition: 'all 0.2s',
		},
		'&:hover': {
			borderRadius: '12px',
			background: theme.colors.grape[5],
			color: '#101113',
			svg: {
				color: '#ffff',
			},
		}
	}
}));

interface LinksProps {
	icon?: React.FC<any>;
	path: string;
	title: string;
	Component: FC<{}>;
}

const NavbarLink = ({icon: Icon, path, title}: LinksProps) => {
	const location = useLocation();
	const { classes } = useStyles(
    {
      location: location.pathname.split('/')[1], 
      path: path.split('/')[1]
    }
  );
	

	return (
		<NavLink to={path}>
			<Flex align="center" gap={8} className={classes.link}>
				{Icon  && <Icon stroke="1.5" />}
				<Text lh={'24px'} size="md">{title === 'Виды анализа' ? 'Прогнозирование' : title}</Text>
			</Flex>
		</NavLink>
	);
};

const NavbarLinksGroup = () => {

	const links = authRoutes.map((link) => {
			return (
				<NavbarLink
					{...link}
					key={link.title}
				/>
			);
	});

	return (
		<nav id="nav">
			<Stack justify="center" align="center" spacing={8}>
				{links}
			</Stack>
		</nav>
	);
};

export default NavbarLinksGroup;