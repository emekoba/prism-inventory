import React, { useContext, useEffect, useRef, useState } from "react";
import { Control } from "../../state/reducer";
import "./itempage.css";
import {
	PanoramaIcon,
	DeleteIcon,
	AddIcon,
	CloseIcon,
	CheckIcon,
} from "../../resources/resources";
import { Modal } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { DisPatchCommands } from "../../globals/Globals";
import SingleItem from "./SingleItem";

export default function ItemPage() {
	const control = useContext(Control);

	const [modalOpen, setModalOpen] = useState(false);

	const [item, setItem] = useState({
		name: "",
		description: "",
		previewImage: null,
	});

	const fileInputRef = useRef();

	function createItem() {
		control.dispatch({
			type: DisPatchCommands.CREATE_ITEM,
			item,
		});

		control.dispatch({
			type: DisPatchCommands.GET_ITEMS,
		});

		setModalOpen(false);
	}

	function deleteItem(itemId) {
		control.dispatch({
			type: DisPatchCommands.DELETE_ITEM,
			itemId,
		});

		control.dispatch({
			type: DisPatchCommands.GET_ITEMS,
		});
	}

	function updateField(e, field) {
		setItem({ ...item, [`${field}`]: e.target.value });
	}

	function addImage(evt) {
		const file = evt.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (e) =>
				setItem({ ...item, previewImage: e.target.result });
		} else {
		}
	}

	return (
		<div className="itempage">
			{Object.keys(control.state.items)
				.reverse()
				.map((key) => {
					const each_item = control.state.items[key];

					if (each_item["creator"] === control.state.currentUser.id)
						return (
							<SingleItem
								id={key}
								key={key}
								name={each_item["name"]}
								description={each_item["description"]}
								previewImage={each_item["previewImage"]}
								deleteItem={deleteItem}
							/>
						);
				})}

			<Modal open={modalOpen} style={{ border: "none" }}>
				<div className="create-item-page">
					<Fab
						size="large"
						style={{ ..._x.fab, top: 55 }}
						onClick={() => setModalOpen(false)}
					>
						<CloseIcon style={{ color: "white" }} />
					</Fab>

					<Fab size="large" style={_x.fab} onClick={createItem}>
						<CheckIcon style={{ color: "white" }} />
					</Fab>

					<div className="create-item-page-header">Create Item</div>

					<div className="create-item-page-main">
						<div className="preview-image">
							{item.previewImage ? (
								<img
									src={item.previewImage}
									onClick={() => fileInputRef.current.click()}
								/>
							) : (
								<AddIcon
									style={{ color: "white", position: "absolute", fontSize: 50 }}
								/>
							)}

							<input
								onChange={addImage}
								ref={fileInputRef}
								type="file"
								style={_x.upload}
							/>
						</div>

						<div className="create-item-page-main-col2">
							<div className="item-input-cntr">
								<p>Item Name :</p>
								<input
									value={item.name}
									className="item-input"
									onChange={(e) => updateField(e, "name")}
								/>
							</div>

							<div className="item-input-cntr">
								<p>Item Description :</p>
								<input
									value={item.description}
									className="item-input"
									onChange={(e) => updateField(e, "description")}
								/>
							</div>
						</div>
					</div>
				</div>
			</Modal>

			<Fab size="large" style={_x.fab} onClick={() => setModalOpen(true)}>
				<AddIcon style={{ color: "white" }} />
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

	upload: {
		opacity: 0,
		height: "100%",
		width: "100%",
	},
};
