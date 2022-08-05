import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    currentComponent: {
      id: 0,
      type: 'button',
      attributes: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      change: 0
    },
    pageData: {
      projectID: '0',
      name: '空项目',
      data: {
        id: 'app',
        type: 'div',
        top: '0px',
        left: '0px',
        width: '340px',
        height: '600px',
        children: []
      }
    }
  },
  reducers: {
    updateCurrentComponentIdType: (state, action) => {
      state.currentComponent.id = action.payload.id;
      state.currentComponent.type = action.payload.type;
    },
    updateCurrentComponentAttributes: (state, action) => {
      state.currentComponent.attributes = action.payload.attributes;
      state.currentComponent.change = action.payload.change;
    },
    updatePageData: (state, action) => {
      state.pageData.data = action.payload
    },
    updatePageInfo: (state, action) => {
      state.pageData.projectID = action.payload.projectID;
      state.pageData.name = action.payload.name;
    }
  }
});

export const selectPage = state => state.page;

export const { updatePageData, updatePageInfo, updateCurrentComponentAttributes, updateCurrentComponentIdType } = pageSlice.actions;

export default pageSlice.reducer;