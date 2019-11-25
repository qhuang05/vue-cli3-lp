<template>
  <div class="g-layout">
    <div class="g-left">
      <el-tree
        ref="tree"
        node-key="id"
        :check-on-click-node="true"
        :expand-on-click-node="false"
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        :default-expanded-keys="[1]"
        @node-click="treeNodeClick"
      ></el-tree>
    </div>
    <div class="g-right">
      <div class="search-form">
        <el-form :model="searchForm" ref="searchForm" size="mini" inline>
          <el-form-item label="名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button type="primary" size="mini" @click="addCatalog">新增目录</el-button>
          <!-- <el-button type="primary" size="mini" @click="editCatalog">修改目录</el-button> -->
          <!-- <el-button type="primary" size="mini" @click="deleteCatalog">删除</el-button> -->
        </div>
      </div>
      <el-table
        class="wp100"
        size="mini" border stripe
        :data="tableData"
        :max-height="maxHeight"
        v-auto-height:maxHeight="-20"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        tooltip-effect="dark"
        @selection-change="tableSelectionChange"
      >
        <el-table-column prop="id" label="排序"></el-table-column>
        <el-table-column prop="category_name" label="分类名称"></el-table-column>
        <el-table-column prop="id" label="分类图片">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="分类图片">
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="上级分类"></el-table-column> -->
        <el-table-column prop="id" label="创建时间"></el-table-column>
        <el-table-column prop="id" label="状态">
          <template slot-scope="scope">
            <el-switch class="switchajax" v-model="scope.row.available" disabled @click.native='lockuser(scope.$index,scope.row)' :active-value='1' :inactive-value='0'></el-switch>
        </template>
        </el-table-column>
        <el-table-column
        fiex='right'
        label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editCatalog(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteCatalog(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="DLaddEditCatalog.title" :visible.sync="DLaddEditCatalog.visible" width="600px">
      <add-edit-catalog
        :parent="DLaddEditCatalog.parent || {}"
        :data="DLaddEditCatalog.data"
        v-if="DLaddEditCatalog.visible"
        @callback="addEditCatalogCb"
      ></add-edit-catalog>
    </el-dialog>
  </div>
</template>

<script>
import addEditCatalog from './components/add-edit-catalog';

export default {
  components: {
    addEditCatalog,
  },
  data() {
    return {
      maxHeight: 500,
      catalogDataList: [],
      treeProps: {
        children: 'children',
        label: 'category_name',
      },
      treeNodeSelected: null,
      searchForm: {},
      tableDataSelected: [],

      DLaddEditCatalog: {
        title: '编辑目录',
        data: null,
        parent: null,
        visible: false,
      },
      tableLoading: false,
    };
  },
  computed: {
    // treeData() {
    //   function getJsonTree(data, parent_id, category_name) {
    //     const itemArr = [];
    //     for (let i = 0; i < data.length; i += 1) {
    //       const node = data[i];
    //       if (node.parent_id === parent_id) {
    //         node.category_name = category_name;
    //         const children = getJsonTree(data, node.id, node.name);
    //         if (children.length > 0) {
    //           node.children = children;
    //           node.children.sort((a, b) => a.sort - b.sort);
    //         }
    //         itemArr.push(node);
    //       }
    //     }
    //     console.log('lalala',itemArr);
    //     return itemArr;
    //   }
    //   return getJsonTree(this.catalogDataList, -1, '商品目录');
    // },
    treeData() {
      const pData = [];
      pData.push({ category_name: '商城分类', children: this.catalogDataList, category_id: null });
      return pData;
    },
    tableData() {
      // const data = this.treeData.filter(item => {
      //   if(!this.treeNodeSelected || item.category_id === this.treeNodeSelected.category_id){
      //     return item.children;
      //   }
      // });
      if (!this.treeNodeSelected) {
        return this.treeData[0].children;
      } else if (this.treeNodeSelected.children) {
        return this.treeNodeSelected.children;
      }
      return [];
      // console.log('过滤',this.filterCategory(this.treeData))
      // data.sort((a, b) => a.sort - b.sort);
      // if(data[0].children){
      //   return data[0].children;
      // }else{
      //   return [];
      // };
      // console.log('3333',data)
      // return data;
    },
  },
  created() {
    this.getCatalogDataList();
  },
  methods: {
    getCatalogDataList() {
      this.tableLoading = true;
      this.$http.get('/category/get-category').then((data) => {
        this.catalogDataList = data.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    tableSelectionChange(rows) {
      this.tableDataSelected = rows;
    },
    treeNodeClick(node) {
      this.treeNodeSelected = node;
    },
    lockuser(num, rowdata) { // 禁用启用
      this.roleindex = num;
      const islock = rowdata.available === 1 ? 0 : 1;
      const req = {};
      req.category_id = rowdata.category_id;
      req.available = islock;
      this.$http.post('/category/change-category-state', req).then(() => {
        this.tableData[this.roleindex].available = islock;
      });
    },
    addCatalog() {
      // 新增目录
      this.DLaddEditCatalog.title = '新增目录';
      this.DLaddEditCatalog.parent = {};
      this.DLaddEditCatalog.data = { parent_id: this.treeNodeSelected ? this.treeNodeSelected.category_id : null };
      this.DLaddEditCatalog.visible = true;
    },
    editCatalog(index, rowData) {
      this.DLaddEditCatalog.title = '编辑目录';
      this.DLaddEditCatalog.parent = JSON.parse(JSON.stringify(rowData));
      this.DLaddEditCatalog.visible = true;
    },
    addEditCatalogCb(data) {
      this.DLaddEditCatalog.visible = false;
      if (data) this.getCatalogDataList();
    },
    deleteCatalog(index, rowData) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.post('/category/del-category', { category_id: rowData.category_id }).then(() => {
          this.$message({
            message: '操作成功！',
            type: 'success',
            showClose: true,
          });
          this.getCatalogDataList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.g-layout {
  display: flex;
  .g-left {
    width: 200px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .g-right {
    overflow: hidden;
    flex-grow: 1;
  }
}
</style>

