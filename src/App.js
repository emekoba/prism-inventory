import { AppPages } from "./globals/Globals";

function App() {
	const [currentPage, setCurrentPage] = useState(AppPages.HOME_PAGE);

	return (
		<div className="App">
			<Sidebar />
		</div>
	);
}

export default App;
