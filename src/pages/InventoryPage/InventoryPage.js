import React, { useContext, useEffect, useRef, useState } from "react";
import { Control } from "../../state/reducer";
import {
	PanoramaIcon,
	DeleteIcon,
	AddIcon,
	CloseIcon,
	CheckIcon,
} from "../../resources/resources";
import { Modal } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { DisPatchCommands, removeArrItem } from "../../globals/Globals";

import "./inventorypage.css";
import SingleItem from "../ItemPage/SingleItem";

export default function InventoryPage() {
	const control = useContext(Control);

	const [modal, setmodal] = useState({
		isOpen: false,
		type: "create-inventory",
		inventoryId: "",
		inventoryName: "",
	});

	const [inventory, setInventory] = useState({
		name: "",
		description: "",
	});

	const [filter, setfilter] = useState("");

	function createInventory() {
		control.dispatch({
			type: DisPatchCommands.CREATE_INVENTORY,
			inventory,
		});

		control.dispatch({
			type: DisPatchCommands.GET_INVENTORIES,
		});

		setmodal({ ...modal, isOpen: false });
	}

	function deleteInventory(inventoryId) {
		control.dispatch({
			type: DisPatchCommands.DELETE_INVENTORY,
			inventoryId,
		});

		control.dispatch({
			type: DisPatchCommands.GET_INVENTORIES,
		});
	}

	function newItemToInventory(itemId) {
		control.dispatch({
			type: DisPatchCommands.ADD_ITEM_TO_INVENTORY,
			inventoryId: modal.inventoryId,
			itemId,
		});

		control.dispatch({
			type: DisPatchCommands.GET_INVENTORIES,
		});
	}

	function updateField(e, field) {
		setInventory({ ...inventory, [`${field}`]: e.target.value });
	}

	return (
		<div className="inventorypage">
			{Object.keys(control.state.inventories)
				.reverse()
				.map((key) => {
					const each_item = control.state.inventories[key];

					if (each_item["creator"] === control.state.currentUser.id)
						return (
							<SingleInventory
								id={key}
								key={key}
								items={[
									...Object.keys(control.state.inventories[key]?.["items"]).map(
										(item_key) => control.state.items[item_key]
									),
								]}
								name={each_item["name"]}
								description={each_item["description"]}
								previewImage={each_item["previewImage"]}
								deleteInventory={deleteInventory}
								newItemToInventory={(inventoryId, inventoryName) =>
									setmodal({
										...modal,
										isOpen: true,
										type: "add-to-inventory",
										inventoryId,
										inventoryName,
									})
								}
							/>
						);
				})}

			<Modal open={modal.isOpen} style={{ border: "none" }}>
				<div className="create-inventory-page">
					<Fab
						size="large"
						style={{ ..._x.fab, top: 55 }}
						onClick={() => setmodal({ ...modal, isOpen: false })}
					>
						<CloseIcon style={{ color: "white" }} />
					</Fab>

					{modal.type === "create-inventory" ? (
						<>
							<Fab size="large" style={_x.fab} onClick={createInventory}>
								<CheckIcon style={{ color: "white" }} />
							</Fab>

							<div>
								<div className="create-inventory-page-header">
									Create Inventory
								</div>

								<div className="create-inventory-page-main">
									<div className="inventory-input-cntr">
										<p>Inventory Name :</p>
										<input
											value={inventory.name}
											className="inventory-input"
											onChange={(e) => updateField(e, "name")}
										/>
									</div>

									<div className="inventory-input-cntr">
										<p>Inventory Description :</p>
										<input
											value={inventory.description}
											className="inventory-input"
											onChange={(e) => updateField(e, "description")}
										/>
									</div>
								</div>
							</div>
						</>
					) : (
						<div>
							<div className="create-inventory-page-header">
								<span
									style={{
										fontSize: 15,
										marginRight: 10,
										color: "grey",
										marginTop: 10,
									}}
								>
									Inventory :
								</span>

								{modal.inventoryName}
							</div>

							<div className="add-inventory-page-main">
								<div className="add-inventory-row1">
									<div className="inventory-input-cntr">
										<p>Search Items :</p>
										<input
											value={filter}
											className="inventory-input"
											onChange={(e) => setfilter(e.target.value)}
										/>
									</div>
								</div>

								<div className="add-inventory-row2">
									{Object.keys(control.state.items)
										.filter(
											(e) =>
												control.state.items[e].name
													.toLowerCase()
													.indexOf(filter?.toLowerCase()) !== -1
										)
										.map((key) => {
											let _each_item = control.state.items[key];

											if (
												!Object.keys(
													control.state.inventories[modal.inventoryId].items
												).includes(key)
											)
												return (
													<SingleItem
														parentNode="inventory"
														id={key}
														key={key}
														name={_each_item["name"]}
														description={_each_item["description"]}
														previewImage={_each_item["previewImage"]}
														addToInventory={newItemToInventory}
													/>
												);
										})}
								</div>
							</div>
						</div>
					)}
				</div>
			</Modal>

			<Fab
				size="large"
				style={_x.fab}
				onClick={() =>
					setmodal({ ...modal, isOpen: true, type: "create-inventory" })
				}
			>
				<AddIcon style={{ color: "white" }} />
			</Fab>
		</div>
	);
}

function SingleInventory({
	id,
	name,
	description,
	items,
	deleteInventory,
	newItemToInventory,
}) {
	useEffect(() => {
		const _inventory = document.getElementById(id);

		const _rand = Math.random() * 2;

		_inventory.style.animaton = `slide-in ${_rand}s forwards`;

		return () => {
			_inventory.style.animaton = `slide-out 1.0s forwards`;
		};
	}, []);

	return (
		<div id={id} className="single-inventory">
			<div className="single-inventory-row1">
				{items?.map((e) => (
					<>
						{!e.previewImage ? (
							<div style={_x.noImage}>
								<PanoramaIcon
									style={{ color: "var(--border)", fontSize: 80 }}
								/>
							</div>
						) : (
							<img src={e.previewImage} />
						)}
					</>
				))}
			</div>

			<div className="single-inventory-row2">
				<div className="inventory-name">{name}</div>

				<div className="inventory-description">{description}</div>
			</div>

			<button
				className="inventory-add"
				onClick={() => newItemToInventory(id, name)}
			>
				<AddIcon style={{ color: "var(--accent)" }} />
			</button>

			<button className="inventory-delete" onClick={() => deleteInventory(id)}>
				<DeleteIcon style={{ color: "var(--accent)" }} />
			</button>
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

	upload: {
		opacity: 0,
		height: "100%",
		width: "100%",
	},

	noImage: {
		height: 60,
		width: 60,
		display: "grid",
		placeItems: "center",
		marginRight: 40,
	},
};
