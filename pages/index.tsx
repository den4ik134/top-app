import { useState } from "react";
import { Button, Htag, Ptag, Tag, Rating } from "../components";

export default function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h2'>Text</Htag>
			<Button appearance="primary" arrow="right">Text</Button>
			<Button appearance="ghost" arrow="down">Text</Button>
			<Ptag size='l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, quam quae rem nemo, sit culpa est laudantium, aliquid dicta eum debitis tenetur! Vero nulla, aspernatur exercitationem quo impedit voluptatum corporis.</Ptag>
			<Ptag size='m'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, quam quae rem nemo, sit culpa est laudantium, aliquid dicta eum debitis tenetur! Vero nulla, aspernatur exercitationem quo impedit voluptatum corporis.</Ptag>
			<Ptag size='s'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, quam quae rem nemo, sit culpa est laudantium, aliquid dicta eum debitis tenetur! Vero nulla, aspernatur exercitationem quo impedit voluptatum corporis.</Ptag>
			<Tag size="s">adawda</Tag>
			<Tag href="#" size="m" color="red">fseefs</Tag>
			<Tag size="m" color="primary">afeaf</Tag>
			<Tag href="#" color="green">awdada</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
		</>
	);
}
