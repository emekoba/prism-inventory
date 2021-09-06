import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AppPages } from "../globals/Globals";
import HomePage from "../pages/HomePage/HomePage";
import InventoryPage from "../pages/InventoryPage/InventoryPage";
import ItemPage from "../pages/ItemPage/ItemPage";
import Onboarding from "./Onboarding/Onboarding";

export default function Pages() {
	return (
		<div
			className="hideScroll"
			style={{
				height: "100%",
				overflowY: "scroll",
				paddingLeft: 50,
				paddingRight: 50,
				paddingBottom: 30,
			}}
		>
			<Switch>
				<Route exact path={"/"} component={HomePage} />

				<Route exact path={AppPages.HOME_PAGE} component={HomePage} />

				<Route exact path={AppPages.ITEM_PAGE} component={ItemPage} />

				<Route exact path={AppPages.INVENTORY_PAGE} component={InventoryPage} />

				<Redirect to={AppPages.HOME_PAGE} />
			</Switch>
		</div>
	);
}
