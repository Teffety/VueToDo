import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toDoList:[
      {
        id:1,
        isReady:false,
        group:1,
        text:'create simple to do list in the first group',
        type:'list'
      },
      {
        id:2,
        isReady:false,
        group:2,
        text:'create simple to do list in the second group',
        type:'list'
      },
      {
        id:3,
        isReady:false,
        group:undefined,
        text:'create simple to do list widthout group',
        type:'list'
      },
      {
        id:4,
        isReady:false,
        group:1,
        text:'create simple to do list second in the first group',
        type:'list'
      }
    ],
    toDoGroup:[
      {
        id:1,
        name:'First Group',
        isReady:false,
        type:'group'
      },
      {
        id:2,
        name:'Second Group',
        isReady:false,
        type:'group'
      }
    ]
  },
  mutations: {
    addGroup(state, value){
      const array = state.toDoGroup.map(el => el.id);
      const maxId = Math.max.apply(Math,array)
      value.id= maxId + 1
      state.toDoGroup.push(value);
    },
    removeGroup(state, value){
      state.toDoGroup = state.toDoGroup.filter(el => el.id != value.id);
      state.toDoList = state.toDoList.filter(el => el.group != value.id)
    },
    updateGroup(state, value){
      state.toDoGroup = state.toDoGroup.map(el => {
        if(el.id === value.id) return value;
        else return el;
      })
    },
    updateGroupReady(state, value){
      state.toDoList = state.toDoList.map(el => {
        if(el.group == value.id) el.isReady = value.isReady;

        return el
      })
      state.toDoGroup = state.toDoGroup.map(el => {
        if(el.id == value.id) return value;
        else return el;
      })
    },
    addList(state, value){
        const array = state.toDoList.map(el => el.id);
        const maxId = Math.max.apply(Math,array)
        value.id= maxId + 1
        console.warn(value)
        state.toDoList.push(value);
    },
    removeList(state, value){
        state.toDoList = state.toDoList.filter(el => el.id != value.id);
    },
    updateList(state, value){
        state.toDoList = state.toDoList.map(el => {
          if(el.id == value.id) return value;
          else return el;
        })
    },
    draggingItem(state, value){
      state.toDoList = state.toDoList.map(el => {
        if(el.id == value.list.id) {
          el.group = value.group.id;
          return el
        }
        else return el
      })
    }
  },
  actions: {
    addGroup({commit},value){
      commit('addGroup', value);
    },
    removeGroup({commit}, value){
      commit('removeGroup', value);
    },
    updateGroup({commit},value){
      commit('updateGroup',value);
    },
    updateGroupReady({commit}, value){
      commit('updateGroupReady', value);
    },
    addList({commit}, value){
      commit('addList',value);
    },
    removeList({commit}, value){
      commit('removeList',value);
    },
    updateList({commit},value){
      commit('updateList',value);
    },
    draggingItem({commit}, value){
      commit('draggingItem', value)
    }
  },
  getters:{
    getToDoList: state => state.toDoList,
    getToDoGroup: state => state.toDoGroup,

  }
})
