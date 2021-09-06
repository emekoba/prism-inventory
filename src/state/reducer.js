import { createContext } from "react";
import { AppPages, DisPatchCommands, generateId } from "../globals/Globals";

export const Control = createContext();

export const globalStore = {
	isLoggedIn: false,

	currentAppPage: AppPages.HOME_PAGE,

	items: { ...JSON.parse(localStorage.getItem("items")) },

	inventories: {
		...JSON.parse(localStorage.getItem("inventories")),
	},

	currentUser: {},

	itemFilter: "",

	inventoryFilter: "",
};

function loginUser(email, password, state) {
	let exists = false;
	let authUser = {};

	const users = JSON.parse(localStorage.getItem("users"));

	Object.keys(users).map((key) => {
		if (users[key]["email"] == email && users[key]["password"] == password) {
			exists = true;
			authUser = { ...users[key], id: key };
		}
	});

	return {
		...state,
		isLoggedIn: exists,
		currentUser: authUser,
	};
}

function registerUser(name, email, password, state) {
	const usersDb = JSON.parse(localStorage.getItem("users"));

	let newUsersDb = {
		...usersDb,
		[`${generateId()}`]: {
			name,
			email,
			password,
			createdAt: new Date(),
		},
	};

	localStorage.setItem("users", JSON.stringify(newUsersDb));

	return state;
}

function createItem(item, state) {
	let ordered_item = { ...JSON.parse(localStorage.getItem("items")) };

	console.log(globalStore.currentUser);

	ordered_item[generateId()] = {
		...item,
		creator: state.currentUser.id,
		createdAt: new Date(),
	};

	localStorage.setItem("items", JSON.stringify(ordered_item));

	return {
		...state,
	};
}

function createInventory(inventory, state) {
	let ordered_inventory = {
		...JSON.parse(localStorage.getItem("inventories")),
	};

	ordered_inventory[generateId()] = {
		...inventory,
		items: {},
		creator: state.currentUser.id,

		createdAt: new Date(),
	};

	localStorage.setItem("inventories", JSON.stringify(ordered_inventory));

	return {
		...state,
	};
}

function addItemToInventory(inventoryId, itemId) {
	let inventoriesDb = JSON.parse(localStorage.getItem("inventories"));

	inventoriesDb[inventoryId] = {
		...inventoriesDb[inventoryId],
		items: {
			...inventoriesDb[inventoryId]["items"],
			[`${itemId}`]: {
				addedAt: new Date(),
			},
		},
	};

	localStorage.setItem("inventories", JSON.stringify(inventoriesDb));
}

function removeItem() {}

function deleteItem(itemId) {
	let items = JSON.parse(localStorage.getItem("items"));

	delete items[itemId];

	localStorage.setItem("items", JSON.stringify(items));
}

function deleteInventory(inventoryId) {
	let inventories = JSON.parse(localStorage.getItem("inventories"));

	delete inventories[inventoryId];

	localStorage.setItem("inventories", JSON.stringify(inventories));
}

function getItems(state) {
	return { ...state, items: JSON.parse(localStorage.getItem("items")) };
}

function getInventories(state) {
	return {
		...state,
		inventories: JSON.parse(localStorage.getItem("inventories")),
	};
}

export function reducer(state = globalStore, action) {
	switch (action.type) {
		case DisPatchCommands.LOGIN:
			return loginUser(action.email, action.password, state);

		case DisPatchCommands.REGISTER:
			return registerUser(action.name, action.email, action.password, state);

		case DisPatchCommands.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
			};

		case DisPatchCommands.CHANGE_CURRENT_PAGE:
			return {
				...state,
				currentAppPage: action.payload,
			};

		case DisPatchCommands.GET_ITEMS:
			return getItems(state);

		case DisPatchCommands.CREATE_ITEM:
			return createItem(action.item, state);

		case DisPatchCommands.DELETE_ITEM:
			deleteItem(action.itemId);
			return { ...state };

		case DisPatchCommands.ADD_ITEM_TO_INVENTORY:
			addItemToInventory(action.inventoryId, action.itemId);
			return { ...state };

		case DisPatchCommands.GET_INVENTORIES:
			return getInventories(state);

		case DisPatchCommands.CREATE_INVENTORY:
			return createInventory(action.inventory, state);

		case DisPatchCommands.DELETE_INVENTORY:
			deleteInventory(action.inventoryId);
			return { ...state };

		case DisPatchCommands.FILTER_INVENTORY:
			return { ...state, inventoryFilter: action.value };

		case DisPatchCommands.FILTER_ITEM:
			return { ...state, itemFilter: action.value };

		default:
			return state;
	}
}
