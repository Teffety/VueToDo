<template>
     <div class="list" :class='{"list-ready":item.isReady}' @mousedown="$emit('down', item)" title="Task" @mouseup="$emit('up',item)">
        <div class="list__toolbar">
            <div class="list__toolbar-remove" title="Remove">
                <button class="btn" @click="remove(item)">D</button>
            </div>
            <div class="list__toolbar-update" title="Update">
                <button class="btn" @click="update(item)" :disabled="item.isReady">U</button>
                
            </div>
            <div class="list__toolbar-watch" title="watch">
                <button class="btn" @click="watch(item)">W</button>
            </div>
            <div class="list__toolbar-checkbox" :class='{"ready":item.isReady}' title="Change status" @click="changeReady(item)">
            </div>
        </div>
        <p>
            {{item.text}}
        </p>
    </div>
</template>
<script>
export default {
    props:{
        remove:{
            type:Function,
            default:function (){},
        },
        update:{
            type:Function,
            default:function (){},
        },
        watch:{
            type:Function,
            default:function (){},
        },
        changeReady:{
            type:Function,
            default:function (){},
        },
        item:{
            type:Object,
            default:''
        }
    },
}
</script>
<style lang="scss">
$colorMain: rgb(204, 204, 204);
$colorGreen: rgb(107, 212, 93);
.list{
    display: flex;
    flex-flow:  row nowrap;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    p{
        cursor: pointer;
    }
    &-ready{
        text-decoration: line-through $colorGreen;
        color:$colorMain
    }
    &__toolbar{
        display: flex;
        flex-flow: row nowrap;
        padding: 0px 10px;
        justify-content:space-between;
        align-items: center;
        width: 100px;
        min-width: 100px;
        &-checkbox{
            position: relative;
            width: 20px;
            height: 20px;
            background-color: transparent;
            border:2px solid $colorMain;
            border-radius: 4px;
            cursor: pointer;
            &.ready{
                border-color:$colorGreen;
            }
        }
    }
}
</style>