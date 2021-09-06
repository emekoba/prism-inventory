import React, { useEffect } from "react";
import "./itempage.css";
import { PanoramaIcon, DeleteIcon, ReplyIcon } from "../../resources/resources";

export default function SingleItem({
	id,
	parentNode,
	name,
	description,
	previewImage,
	deleteItem,
	addToInventory,
}) {
	useEffect(() => {
		const _item = document.getElementById(id);

		const _rand = Math.random() * 2;

		_item.style.animaton = `slide-in ${_rand}s forwards`;

		return () => {
			_item.style.animaton = `slide-out 1.0s forwards`;
		};
	}, []);

	const _x = {
		noImage: {
			width: "100%",
			display: "grid",
			placeItems: "center",
		},
	};

	return (
		<div
			id={id}
			className="single-item"
			// style={{ width: parentNode === "inventory" ? 300 : "100%" }}
		>
			{!previewImage ? (
				<div style={_x.noImage}>
					<PanoramaIcon style={{ color: "var(--border)", fontSize: 80 }} />
				</div>
			) : (
				<img src={previewImage} />
			)}

			<div className="single-item-row2">
				<div className="item-name">{name}</div>

				<div className="item-description">{description}</div>
			</div>

			<button
				className="fab-type item-delete"
				onClick={() =>
					parentNode === "inventory" ? addToInventory?.(id) : deleteItem?.(id)
				}
			>
				{parentNode === "inventory" ? (
					<ReplyIcon style={{ color: "var(--accent)" }} />
				) : (
					<DeleteIcon style={{ color: "var(--accent)" }} />
				)}
			</button>
		</div>
	);
}
