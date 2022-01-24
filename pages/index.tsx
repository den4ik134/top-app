import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, Ptag, Tag, Rating } from "../components";
import { WithLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h2'>Text</Htag>
			<Button appearance="primary" arrow="right">Text</Button>
			<Button appearance="ghost" arrow="down">Text</Button>

			<Tag size="s">adawda</Tag>
			<Tag href="#" size="m" color="red">fseefs</Tag>
			<Tag size="m" color="primary">afeaf</Tag>
			<Tag href="#" color="green">awdada</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<ul>
				{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
			</ul>

		</>
	);
}

export default WithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
