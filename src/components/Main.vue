<template>
    <div class="wrapper">
        <Modal 
            v-if="isOpen" 
            :removeFunction="remove"
            :remove="isRemove"
            :add="isAdd"
            :item="value"
            :close="close"
            :watch="isWatch"
        />
        <div class="toDo">
            <header>
                <h4>Add new List or Group</h4>
                <div class="add__list">
                    <button class="add__list-btn" @click="addFunction">Add New</button>
                </div>
                <div class="search__block">
                    <input type="text" v-model="filter" class="input-search" title="search filter" placeholder="Find task..."/>
                    <input type="checkbox" v-model="isTrue" name="isTrue" title="Sort by Ready"/>
                    <label for="isTrue" title="Sort by Ready"> ready</label>
                    <input type="checkbox" v-model="isFalse" name="isFalse" title="Sort by Not ready"/>
                    <label for="isFalse" title="Sort by Not ready"> unready</label>
                </div>
            </header>
            <main>

                <template v-for="list in getList">    
                    <List 
                        v-if="list.group == undefined && (isTrue == list.isReady || !isFalse == list.isReady)"
                        @down="down"
                        @up="upList"
                        :item="list"
                        :remove="callRemove"
                        :update="callUpdate"
                        :watch="callWatch"
                        :changeReady="isReady"
                        :key="list.id+'undef'" />
                </template>

                <template v-if="getToDoGroup.length > 0 ">
                    <Group
                        v-for="group in getToDoGroup" 
                        :item="group"
                        @up="up"
                        :remove="callRemove"
                        :update="callUpdate"
                        :changeReady="isReady"
                        :key="group.id + 'groupName'"
                    >
                    <template v-for="list in getList">
                            <List 
                                v-if="list.group == group.id && (isTrue == list.isReady || !isFalse == list.isReady)"
                                @down="down"
                                @up="upList"
                                :item="list"
                                :remove="callRemove"
                                :update="callUpdate"
                                :watch="callWatch"
                                :changeReady="isReady"
                                :key="list.id+'group'" />
                        </template>
                    </Group>
                </template>

            </main>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters} from 'vuex';
import Modal from './Modal.vue'
import Group from './Group.vue'
import List from './List.vue'

export default {
    components:{
        Modal,
        Group,
        List
    },
    data(){
        return {
            isOpen:false,
            value:undefined,
            isRemove:false,
            isAdd:true,
            isWatch:false,
            downItem:undefined,
            filter:'',
            isTrue:false,
            isFalse:false,
        }
    },
    computed:{
        ...mapGetters([
            'getToDoList',
            'getToDoGroup'
        ]),
        getList(){
                if(this.filter.length > 0) {
                    return this.getToDoList.filter(el => el.text.toUpperCase().trim().indexOf(this.filter.toUpperCase().trim()) > -1)
                }else return this.getToDoList
        }
    },
    methods:{
        ...mapActions([
            'updateGroup',
            'updateGroupReady',
            'updateList',
            'removeGroup',
            'removeList',
            'draggingItem'
        ]),
        isReady(item){
            const object = Object.assign(item);
            object.isReady = !item.isReady;

            if (item.type === 'group') this.updateGroupReady(object)
            else this.updateList(object)
        },
        remove(item){

            if(item.type === 'group') this.removeGroup(item)
            else this.removeList(item)
            
            this.close()
        },
        callRemove(item){
            this.isOpen = true;
            this.isRemove = true
            this.value = item
            this.isAdd = false;
            this.isWatch = false;
        },
        callUpdate(item){
            this.isOpen = true
            this.isRemove = false;
            this.isAdd = true;
            this.value = item;
            this.isWatch = false;
        },
        callWatch(item){
            this.isOpen = true
            this.isRemove = false;
            this.isAdd = false;
            this.value = item;
            this.isWatch = true;
        },
        addFunction(){
            this.isOpen = true
            this.isRemove = false;
            this.isAdd = true;
            this.value = undefined;
        },
        close(){
            this.isOpen = false;
            this.isRemove = false;
            this.isAdd = false;
            this.isUpdate = false;
            this.value = undefined;
        },
        down(item){
            this.downItem = item
        },
        upList(item){
            if(item.id === this.downItem.id && item.type == this.downItem.type) {
                this.downItem = undefined
            }
        },
        up(item){
            if(this.downItem != undefined){
                this.draggingItem({
                    list:this.downItem, 
                    group:item
                })
                this.downItem = undefined
            }
        },
    }
}
</script>
<style lang="scss">
$colorMain: rgb(204, 204, 204);

.wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    
    & .toDo{
        margin: 10px auto 0;
        width: calc(100% - 30px);
        height: 100%;
        & header{
            width:100%;
            height: 100px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-flow: column;
            position: relative;
            & .add__list{
                margin:10px 0px;
            }
            & h4{
                padding: 0;
                margin: 0;
            }
            .search__block{
                input{
                    cursor: pointer;
                }
                input[type=text]{
                    width: 70px;
                    border-radius: 4px;
                    border-style: solid;
                    border-color:$colorMain; 
                    cursor: pointer;
                    &:focus{
                        outline: none;
                    }
                }
            
            }
        }
        & main{
            width: 100%;
            height: calc(100% - 120px);
            overflow: auto;
        }
    }
}
button{
    padding: 4px;
    margin: 0;
    border: 1px solid $colorMain;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    &:disabled{
        background-color:rgb(209, 209, 209);
    }
}
</style>