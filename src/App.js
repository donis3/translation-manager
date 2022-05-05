import DefaultLayout from './components/layout/DefaultLayout';
import ContextWrapper from './context/ContextWrapper';
import Router from './Router';


function App() {
	return (
		<ContextWrapper>
			<DefaultLayout>
				<Router />
			</DefaultLayout>
		</ContextWrapper>
	);
}

export default App;
