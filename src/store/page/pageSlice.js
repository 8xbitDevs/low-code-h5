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
        },
        img: {
          src:'https://cn.vitejs.dev/logo-with-shadow.png'
        },
        video: {
          src:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
        }
        
      },
      script: {
        switch: "false",
        cli: 'single',
        act: 'jump',
        jumpTo: ''
      },
      change: 0
    },
    myWork: [],
    saveData: {
      id: '',
      html: '',
    },
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
    updateSaveData: (state, action) => {
      state.saveData = action.payload
    },
    updateMyWork: (state, action) => {
      state.myWork = action.payload
    },
    updateCurrentComponentScript: (state, action) => {
      state.currentComponent.script = action.payload.script
      state.currentComponent.change = action.payload.change;
    },
  }
});

export const selectPage = state => state.page;

export const {updateCurrentComponentAttributes, updateCurrentComponentIdType, updateCurrentComponentScript, updateMyWork, updateSaveData } = pageSlice.actions;

export default pageSlice.reducer;