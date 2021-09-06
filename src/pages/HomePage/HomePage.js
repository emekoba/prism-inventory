import React, { useContext, useEffect, useState } from "react";
import { Control } from "../../state/reducer";
import "./homepage.css";

export default function HomePage() {
	const [inv_no, setInv_no] = useState(0);
	const [it_no, setIt_no] = useState(0);

	const control = useContext(Control);

	useEffect(() => {
		setInv_no(
			Object.keys(control.state.inventories).filter(
				(e) =>
					control.state.inventories[e]["creator"] ===
					control.state.currentUser.id
			).length
		);

		setIt_no(
			Object.keys(control.state.items).filter(
				(e) =>
					control.state.items[e]["creator"] === control.state.currentUser.id
			).length
		);
	}, []);

	return (
		<div className="homepage">
			<div className="home-stats">
				{it_no}

				{it_no !== 1 ? " Items" : " Item"}
			</div>

			<div className="home-stats">
				{inv_no}

				{inv_no !== 1 ? " Inventories" : " Inventory"}
			</div>
		</div>
	);
}
