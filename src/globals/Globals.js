export const AppPages = {
	HOME_PAGE: "/home",
	ITEM_PAGE: "/item",
	INVENTORY_PAGE: "/inventory",
	ABOUT_PAGE: "/about",
	ONBOARDING_PAGE: "/onboarding",
	CREATE_ITEM_PAGE: "/item/create",
};

export const DisPatchCommands = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	GET_USER: "GET_USER",
	LOGOUT: "LOGOUT",
	CHANGE_CURRENT_PAGE: "CHANGE_CURRENT_PAGE",
	ADD_ITEM_TO_INVENTORY: "ADD_ITEM_TO_INVENTORY",
	CREATE_ITEM: "CREATE_ITEM",
	GET_ITEMS: "GET_ITEMS",
	DELETE_ITEM: "DELETE_ITEM",
	CREATE_INVENTORY: "CREATE_INVENTORY",
	GET_INVENTORIES: "GET_INVENTORIES",
	DELETE_INVENTORY: "DELETE_INVENTORY",
	FILTER_INVENTORY: "FILTER_INVENTORY",
	FILTER_ITEM: "FILTER_ITEM",
};

export function generateId(length) {
	if (!length) {
		length = 20;
	}

	let result = "";

	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	let charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export function removeArrItem(arr, value) {
	var i = 0;
	while (i < arr.length) {
		if (arr[i] === value) {
			arr.splice(i, 1);
		} else {
			++i;
		}
	}
	return arr;
}
