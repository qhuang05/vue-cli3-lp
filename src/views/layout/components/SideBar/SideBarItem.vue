<template>
  <div class="side-bar-item">
    <div v-if="routes">
      <template v-for="item in routes.filter(i => !i.hidden && i.children)">
        <router-link v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow && !item.meta.hasThird" :to="item.path+'/'+item.children[0].path"
          :key="item.children[0].path">
          <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <i v-if="item.children[0]&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
            <span v-if="item.children[0] && item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.path" :key="item.path">
          <template slot="title" class="link">
            <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta && item.meta.title" slot="title" style="color: rgba(255, 255, 255, 0.85)">{{item.meta.title}}</span>
          </template>
          <div v-if="item.children">
            <template v-for="child in item.children.filter(i => !i.hidden)">
              <side-bar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></side-bar-item>
              <router-link class="link" v-else :to="item.path+'/'+child.path" :key="child.path">
                <el-menu-item :index="item.path+'/'+child.path">
                  <i v-if="child && child.meta.icon" :class="child.meta.icon"></i>
                  <span v-if="child && child.meta.title" slot="title">{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </div>
        </el-submenu>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    routes: {
      type: Array,
    },
  },
  data() {
    return {
      isNest: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar-item {
  a {
    text-decoration: none;
    display: inline-block;
    width: 100%;
  }
  .link {
    height: 48px !important;
    line-height: 48px !important;
    background-color: #000c17 !important;
  }
  .el-submenu .el-menu-item {
    padding-left: 40px !important;
    background-color: #000c17 !important;
    &:hover {
      color: #fff !important;
    }
  }
  .el-menu-item,
  .el-submenu .el-menu-item {
    height: 42px !important;
    line-height: 42px !important;
    margin: 8px 0;
    color: rgba(255, 255, 255, 0.85) !important;
    &.is-active {
      background-color: #409eff !important;
      color: #fff !important;
    }
    &:hover {
      color: #fff !important;
    }
  }

  .el-menu-item {
    .el-submenu__title {
      i {
        font-size: 14px;
        color:#fff;
      }
    }
  }
}
</style>
<style>
  .side-bar-item .el-submenu__title{
    height: 48px !important;
    line-height: 48px !important;
  }
</style>

