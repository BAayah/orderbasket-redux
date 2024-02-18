export const REMOVE_ORDER = "REMOVE_ORDER";

export const remove_order = (title) => ({
    type: REMOVE_ORDER,
    payload: {
        title,
    },
});