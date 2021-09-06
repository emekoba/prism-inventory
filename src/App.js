import Sidebar from "./components/Sidebar/Sidebar";
import "./app.css";
import Pages from "./pages/Pages";
import Header from "./components/Header/Header";
import { useContext, useReducer } from "react";
import { globalStore, reducer, Control } from "./state/reducer";
import Onboarding from "./pages/Onboarding/Onboarding";

function App() {
	const [state, dispatch] = useReducer(reducer, globalStore);

	function Main() {
		const control = useContext(Control);

		return (
			<div
				className="app"
				style={{
					...(!control.state.isLoggedIn && { gridTemplateColumns: "none" }),
				}}
			>
				{!control.state.isLoggedIn ? (
					<Onboarding />
				) : (
					<>
						<Sidebar />
						<Header />
						<Pages />
					</>
				)}
			</div>
		);
	}

	return (
		<Control.Provider
			value={{
				state,
				dispatch,
			}}
		>
			<Main />
		</Control.Provider>
	);
}

export default App;

//? template --- https://dribbble.com/shots/15711636-Catalog
