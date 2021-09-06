import React, { useContext } from "react";
import { Control } from "../../state/reducer";
import "./homepage.css";

export default function HomePage() {
	const control = useContext(Control);

	return (
		<div className="homepage">
			<div className="home-stats">
				{Object.keys(control.state.items).length}
				{Object.keys(control.state.items).length !== 1 ? " Items" : " Item"}
			</div>

			<div className="home-stats">
				{
					Object.keys(control.state.inventories).filter(
						(e) => e["creator"] !== control.state.currentUser.id
					).length
				}
				{Object.keys(control.state.inventories).length !== 1
					? " Inventories"
					: " Inventory"}
			</div>
		</div>
	);
}
