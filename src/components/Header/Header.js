import React, { useContext, useState } from "react";
import { Control } from "../../state/reducer";
import "./header.css";
import { MenuIcon } from "../../resources/resources";
import { Drawer, useMediaQuery } from "@material-ui/core";
import Sidebar from "../Sidebar/Sidebar";

export default function Header() {
	const control = useContext(Control);

	const _mobile = useMediaQuery("(max-width:800px)");

	const [drawerOpen, setDrawerOpen] = useState(false);

	const resolvePagaes = {
		"/home": "Home",
		"/item": "Items",
		"/inventory": "Inventories",
	};

	return (
		<div className="header">
			{_mobile && (
				<button className="header-menu" onClick={() => setDrawerOpen(true)}>
					<MenuIcon style={{ color: "white" }} />
				</button>
			)}

			<div className="header-title">
				{resolvePagaes[control.state.currentAppPage]}
			</div>

			<Drawer
				anchor={"left"}
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			>
				<Sidebar
					parentNode="header"
					isOpen={drawerOpen}
					closeDrawer={() => setDrawerOpen(false)}
				/>
			</Drawer>
		</div>
	);
}
