<template>
    <div class="modal">
        <div class="modal__block">
            <div class="modal__block-close">
                <button class="modal__block-close__btn" @click="close()">x</button>
            </div>

            <template v-if="remove">
                <div class="modal__block-delete">
                    <div class="modal__block-delete__info"> Do you want to delete {{item.type}} where info {{item.name}}?</div>
                    <div class="modal__block-delete__action">
                        <button class="modal__block-delete__btn" @click="removeFunction(item)">
                            Remove {{item.type}}
                        </button>
                    </div>
                </div>
            </template>

            <template v-else-if="add">
                <div class="modal__block-add">
                    <div class="modal__block-add__checkbox">
                        <div class="choosingType" v-if="item === undefined" @click="changeTypeAdd">{{choosingType.type[choosingType.choosing]}}</div>
                        <div class="choosingType" v-else>{{choosingType.type[choosingType.choosing]}} </div>
                    </div>
                    <textarea v-model="value" cols="20" rows="8"></textarea>
                    <div class="modal__block-add__select" v-if="choosingType.choosing === 1">
                        <p @click="isOpen = !isOpen">Choosing group : {{selectValue}}</p>
                        <div class="modal__block-add__select__option" v-if="isOpen" >
                            <div @click="noneGroup">{{baseMessage}}</div>
                            <div v-for="group in getToDoGroup" :key="group.id" @click="choosingSelect(group)">
                                {{group.name}}
                            </div>
                        </div>
                    </div>
                    <div class="save">
                        <button class="save-btn" @click="save">Save</button>
                    </div>
                </div>
            </template>

            <template v-else-if="watch">
                    <div class="modal__block-watch">
                        {{item.text}}
                    </div>
            </template>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    props:{
        remove:{
            type:Boolean,
            default:false,
        },
        add:{
            type:Boolean,
            default:false
        },
        watch:{
            type:Boolean,
            default:false
        },
        removeFunction:{
            type:Function,
            default:function(){}
        },
        item:{
            type:Object,
            default:undefined
        },
        close:{
            type:Function,
        }
    },
    data(){
        return {
            value:'',
            selectObj:undefined,
            selectValue:'',
            baseMessage:'without group',
            isOpen:false,
            choosingType:{
                choosing:1,
                type:[
                    'type Group',
                    'type List'
                ]
            }
        }
    },
    mounted(){
        if(this.item === undefined) this.selectValue = this.baseMessage
        else {
            if(this.item.type =='group') this.value = this.item.name
            else {
                this.value = this.item.text;
                this.selectObj = this.item.group
                if(this.item.group === undefined) this.selectValue = this.baseMessage
                else this.selectValue = this.getToDoGroup.find( el => el.id == this.item.group).name
            }
        }
    },
    computed:{
        ...mapGetters([
            'getToDoList',
            'getToDoGroup'
        ])
    },
    methods:{
        ...mapActions([
            'updateGroup',
            'updateList',
            'addGroup',
            'addList',
        ]),
        choosingSelect(group){
            this.selectValue = group.name
            this.selectObj = group.id;
            this.isOpen = false;    
        },
        noneGroup(){
            this.selectValue = this.baseMessage
            this.selectObj = undefined;
            this.isOpen = false;                
        },
        changeTypeAdd(){
            if(this.choosingType.choosing === 1) this.choosingType.choosing = 0
            else this.choosingType.choosing = 1
        },
        save(){
            let object={}
            if(this.item){
                object = Object.assign(this.item)
                if(object.type === 'group'){
                    object.name = this.value;
                    this.updateGroup(object)                  
                }else {
                    object.text = this.value;
                    object.group = this.selectObj;
                    this.updateList(object)
                }
            }else {
                if(this.choosingType.choosing === 0){
                    object['name'] = this.value;
                    object['type'] = 'group';
                    object['isReady'] = false;
                    this.addGroup(object);    

                }else {
                    object['text'] = this.value;
                    object['type'] = 'list';
                    object['isReady'] = false
                    object['group'] = this.selectObj;
                    this.addList(object);

                }
            }
            this.close();
        }
    }
}
</script>
<style lang="scss">
$colorMain: rgb(204, 204, 204);
.modal{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    &__block{
        position: relative;
        width: 250px;
        height: 250px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 0 4px 1px rgba(0,0,0,0.25);
        &-close{
            position: relative;
            &__btn{
                position: absolute;
                right: 4px;
                top:4px;
                border:none;
                padding: 0px;
                font-size: 12px;
                text-align: center;
            }
        }
        &-add{
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
            margin:5px auto;
            height: calc(100% - 15px);
            p{
                margin: 3px 0px;
            }
            &__select{
                position: relative;
                cursor: pointer;
                border:1px solid $colorMain;
                border-radius: 4px;
                width: calc(100% - 15px);
                text-align: center;
                &__option{
                    position: absolute;
                    background-color: white;
                    width: 100%;
                    top:calc(100% - 2px);
                    box-shadow: 0 2px 2px 1px rgba(0,0,0,0.25);
                    & > div{
                        
                        width: 100%;
                        &:hover{
                            background-color: rgba(0,0,0,0.25);
                        }
                    }
                }
            }
        }
        &-watch{
            position: relative;
            width:calc(100% - 20px);
            height: calc(100% - 20px);
            margin:15px auto 5px;
            overflow: auto;
        }
    }
}
</style>