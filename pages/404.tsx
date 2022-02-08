import { Htag } from "../components";
import { WithLayout } from "../layout/Layout";

function Error404(): JSX.Element {

	return (
		<>
			<Htag tag='h1'>Ошибка 404</Htag>
		</>
	);
}

export default WithLayout(Error404);