<template>
  <div>
    <h1>属性</h1>

    <el-button type="success" @click="addShuxing=true">新增</el-button>

    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="getDetails"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>

      <el-table-column
        prop="nameCH"
        label="中文名称">
      </el-table-column>

      <el-table-column
        prop="typeId"
        label="品牌id">
      </el-table-column>

      <el-table-column
        prop="type"
        label="属性的类型">
      </el-table-column>


      <el-table-column
        prop="createDate"
        label="上架时间">
      </el-table-column>

      <el-table-column
        prop="updateDate"
        label="下架时间">
      </el-table-column>


      <el-table-column
        prop="author"
        label="操作人">
      </el-table-column>


      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="warning" size="small"
                     @click="() => updateFormFlag=true">编辑</el-button>
          <el-button type="text" size="small" v-on:click="deleteSku(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--  新增的弹框   -->
    <el-dialog title="录入属性信息" :visible.sync="addShuxing">

      <el-form :model="addAttribute"  label-width="80px">

        <el-form-item label="属性名称" prop="name">
          <el-input v-model="addAttribute.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="nameCH">
          <el-input v-model="addAttribute.nameCH"></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="typeId">
          <el-input v-model="addAttribute.typeId"></el-input>
        </el-form-item>

        <el-form-item label="是否SKU" prop="isSKU">
          <el-radio v-model="addAttribute.isSKU" label="0">否</el-radio>
          <el-radio v-model="addAttribute.isSKU" label="1">是</el-radio>
        </el-form-item>

        <el-form-item label="是否删除" prop="isDel">
          <el-radio v-model="addAttribute.isDel" label="0">显示</el-radio>
          <el-radio v-model="addAttribute.isDel" label="1">不显示</el-radio>
        </el-form-item>

        <!--属性的类型    0 下拉框     1 单选框      2  复选框   3  输入框-->
        <el-form-item label="属性的类型" prop="type">
          <el-radio v-model="addAttribute.type" label="0">下拉框</el-radio>
          <el-radio v-model="addAttribute.type" label="1">单选框</el-radio>
          <el-radio v-model="addAttribute.type" label="2">复选框</el-radio>
          <el-radio v-model="addAttribute.type" label="3">输入框</el-radio>
        </el-form-item>

        <el-form-item label="操作人" prop="author">
          <el-input v-model="addAttribute.author"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShuxing = false">取 消</el-button>
        <el-button type="primary" @click="addForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination

      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "Shuxing",
        data() {
            return {
                tableData: [],
                sizes: [2, 3, 5, 10],
                size: 2,
                start: 1,
                count: 0,
                /*新增*/
                addShuxing:false,
                addAttribute:{
                    name:"",
                    nameCH:"",
                    typeId:"",
                    type:[],
                    isSKU:"",
                    isDel:"0",
                    author:""
                },
            }
        },
        methods:{
            queryData:function () {
                var athis=this;
                this.$ajax.get("http://localhost:8080/api/attribute/queryAttributeData?start="+this.start+"&size="+this.size).then(function (res) {
                    athis.tableData=res.data.data.list;
                    athis.count=res.data.data.count;
                    console.log(res.data.data.list);

                }).catch(function () {
                    alert("查询失败")
                })
                    },
            addForm:function () {
                var athis=this;
                debugger
                this.$ajax.post("http://localhost:8080/api/attribute/addAttribute",this.$qs.stringify(this.addAttribute)).then(function () {
                    athis.addShuxing = false;
                    athis.queryData(1);
                }).catch(function () {

                })
            },
    handleCurrentChange:function(start){ //跳转页面
        console.log(start);
        this.start=start;
        this.queryData(start);
    },handleSizeChange:function(size) { //跳转页面
            this.size = size;
            this.queryData(1);
        }
    },created:function () {
        //请求数据
        this.queryData(1,2);
        //查询品牌数据
    }
    }
</script>

<style scoped>

</style>
