import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    currentComponent: {
      id: 0,
      type: '',
      attributes: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        mbp: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        borderRadius: 0,
        borderColor: 'rgba(0,0,0,0)',
        bgColor: '',
        fontSize: 12,
        textColor: 'rgba(0,0,0,1)',
        button: {
          innerHTML:'按钮',        
        },
        a:{
          href:'https://github.com/8xbitDevs/low-code-h5'
        }
        
      },
      change: 0
    },
    saveData: {
      id: '',
      html:''
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