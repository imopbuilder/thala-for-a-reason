import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ClientState {
	input: string;
	openDrawer: boolean;
}

const initialState: ClientState = {
	input: '',
	openDrawer: false,
};

const slice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		setinput: (state, action: PayloadAction<ClientState['input']>) => {
			state.input = action.payload;
		},
		setopendrawer: (state, action: PayloadAction<ClientState['openDrawer']>) => {
			state.openDrawer = action.payload;
		},
	},
});

export const { setinput, setopendrawer } = slice.actions;
export default slice.reducer;
