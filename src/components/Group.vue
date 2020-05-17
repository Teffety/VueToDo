<template>
<div class="group" :class='{"group-ready":item.isReady}' @mouseup="$emit('up', item)" title="Name group">
    <div class="group__toolbar">
        <div class="group__toolbar-actions">
                <div class="group__toolbar-remove">
                    <button class="btn" @click="remove(item)">D</button>
                </div>
                <div class="group__toolbar-update">
                    <button class="btn" @click="update(item)" :disabled="item.isReady">U</button>
                </div>
                <div class="group__toolbar-checkbox" :class='{"ready":item.isReady}' @click="changeReady(item)">
                </div>
        </div>
        <h4 class="group__toolbar-name">{{item.name}}</h4>
    </div>
    <slot/>
</div>
</template>
<script>
export default {
    props:{
        remove:{
            type:Function,
        },
        update:{
            type:Function
        },
        changeReady:{
            type:Function
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
.group{
    &-ready{
        h4{
            text-decoration: line-through $colorGreen;
            color:$colorMain;
            user-select: none;
        }
    }
    .group__toolbar{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    
        &-name{
            text-align: center;
        }
        &-checkbox{
            position: relative;
            width: 20px;
            height: 20px;
            background-color: transparent;
            border:2px solid $colorMain;
            border-radius: 4px;
            cursor: pointer;
            &.ready{
                border-color: $colorGreen;
            }
        }
        &-actions{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100px;
            min-width: 100px;
            padding:0px 10px;
            flex-flow: row nowrap;
        }
    }
}

</style>