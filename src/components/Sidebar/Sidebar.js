import React, { useContext, useEffect } from "react";
import "./sidebar.css";
import { Control } from "../../state/reducer";
import { AppPages, DisPatchCommands } from "../../globals/Globals";
import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { ExitToAppIcon } from "../../resources/resources";

export default function Sidebar({ parentNode, isOpen, closeDrawer }) {
	const control = useContext(Control);

	const _mobile = useMediaQuery("(max-width:800px)");

	const pageBtns = {
		Home: {
			link: AppPages.HOME_PAGE,
		},

		Item: {
			link: AppPages.ITEM_PAGE,
		},

		Inventory: {
			link: AppPages.INVENTORY_PAGE,
		},
	};

	const history = useHistory();

	useEffect(() => {
		const sidebar = document.getElementById("sidebar");

		sidebar.style.display =
			!control.state.isLoggedIn || _mobile ? "none" : "grid";
	}, [_mobile, control.state.isLoggedIn]);

	function homeBtnClicked(page) {
		closeDrawer?.();

		control.dispatch({
			type: DisPatchCommands.CHANGE_CURRENT_PAGE,
			payload: page,
		});
	}

	function logout() {
		control.dispatch({ type: DisPatchCommands.LOGOUT });
	}

	return (
		<div
			id="sidebar"
			className="sidebar"
			style={{ width: _mobile ? "70vw" : null }}
		>
			<div className="sidebar-row1">
				<div>
					<div className="avatar-name">{control.state.currentUser.name}</div>
				</div>
			</div>

			<div className="sidebar-row2">
				{Object.keys(pageBtns).map((e) => (
					<Link to={pageBtns[e]["link"]}>
						<button
							className="page-buttons"
							onClick={() => homeBtnClicked(pageBtns[e]["link"])}
							style={{
								fontWeight:
									control.state.currentAppPage === pageBtns[e]["link"]
										? "bold"
										: "normal",
								fontSize:
									control.state.currentAppPage === pageBtns[e]["link"]
										? 18
										: 15,
							}}
						>
							{e}
						</button>
					</Link>
				))}
			</div>

			<div className="sidebar-row3">
				<div className="--fab-type">
					<ExitToAppIcon
						style={{
							color: "white",
							fontSize: 30,
							transform: "rotate(180deg)",
						}}
						onClick={logout}
					/>
				</div>
			</div>
		</div>
	);
}
