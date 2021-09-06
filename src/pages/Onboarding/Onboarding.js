import { Fab, Modal } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { DisPatchCommands } from "../../globals/Globals";
import { ExitToAppIcon } from "../../resources/resources";
import { Control } from "../../state/reducer";
import "./onboarding.css";

export default function Onboarding() {
	const control = useContext(Control);

	const history = useHistory();

	const [auth, setauth] = useState({
		email: "",
		name: "",
		password: "",
		signState: "sign-in",
	});

	const [error, seterror] = useState(false);

	function updateField(e, field) {
		setauth({ ...auth, [`${field}`]: e.target.value });
	}

	function login() {
		control.dispatch({
			type: DisPatchCommands.LOGIN,
			email: auth.email,
			password: auth.password,
		});

		if (!control.state.isLoggedIn) {
			seterror(true);
		}
	}

	function register() {
		control.dispatch({
			type: DisPatchCommands.REGISTER,
			name: auth.name,
			email: auth.email,
			password: auth.password,
		});

		setauth({ ...auth, signState: "sign-in" });
	}

	return (
		<div className="onboarding">
			<div className="onboarding-header">
				<div className="header-title">Prism Inventory</div>
			</div>

			<div className="onboarding-main">
				<div className="onboarding-col1 hideScroll">
					{auth.signState === "sign-up" && (
						<div className="item-input-cntr">
							<p>Full Name :</p>
							<input
								value={auth.naem}
								className="item-input"
								onChange={(e) => updateField(e, "name")}
							/>
						</div>
					)}

					<div className="item-input-cntr">
						<p>Email Address :</p>
						<input
							value={auth.email}
							className="item-input"
							onChange={(e) => updateField(e, "email")}
						/>
					</div>

					<div className="item-input-cntr">
						<p>Password :</p>
						<input
							value={auth.password}
							className="item-input"
							onChange={(e) => updateField(e, "password")}
						/>
					</div>
				</div>

				<div className="onboarding-col2">
					<button
						onClick={() => setauth({ ...auth, signState: "sign-in" })}
						style={{ fontSize: 20, marginRight: 50 }}
					>
						Sign In
					</button>

					<button
						onClick={() => setauth({ ...auth, signState: "sign-up" })}
						style={{ fontSize: 20 }}
					>
						Sign Up
					</button>
				</div>
			</div>

			<Modal open={error} style={{ border: "none" }}>
				<div className="error-box-cntr" onClick={() => seterror(false)}>
					<div className="error-box">Invalid username or password!</div>
				</div>
			</Modal>

			<Fab
				size="large"
				style={_x.fab}
				onClick={auth.signState === "sign-in" ? login : register}
			>
				<ExitToAppIcon
					style={{
						color: "white",
						fontSize: 30,
					}}
				/>
			</Fab>
		</div>
	);
}

const _x = {
	fab: {
		border: "1px solid white",
		background: "var(--border)",
		position: "absolute",
		bottom: 55,
		right: 55,
	},
};
