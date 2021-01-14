<template>
  <div>
    <h1>商品分类管理</h1>
    <el-tree :data="data" :props="defaultProps" @node-click="clickNode" accordion></el-tree>
    <el-row v-show="isShow">
    <el-button type="primary" @click="addData=true" round>新增</el-button>
    <el-button type="success" @click="updateData=true" round>修改</el-button>
    <el-button type="warning" @click="" round>批量删除</el-button>
    </el-row>

    <el-dialog title="录入商品分类信息" :visible.sync="addData">
      <el-form :model="addFormData" ref="addForm"   label-width="80px">

        <el-form-item label="上级名称" prop="name">
          <el-input v-model="addFormData.pName" readonly autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="addFormData.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addData = false">取 消</el-button>
        <el-button type="primary" @click="addType()">确 定</el-button>
      </div>


    </el-dialog>

    <el-dialog title="修改商品分类信息" :visible.sync="updateData">
      <el-form :model="updateFormData" ref="addForm"   label-width="80px">

        <el-form-item label="上级名称" prop="name">
          <el-input v-model="updateFormData.pid" readonly autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="updateFormData.name" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="是否显示" prop="carType">
          <el-radio-group v-model="updateFormData.isDel">
            <el-radio label="0" >不删除</el-radio>
            <el-radio label="1" >删除</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateData = false">取 消</el-button>
        <el-button type="primary" @click="updateType()">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Type",
        data() {
            return {
                data:[], //tree数据
                ajaxData:[],  //远程接口返回的数据
                jsonStr:"",    //将返回的数据转换成字符串
                defaultProps:{},
                addData:false,
                updateData:false,
                addFormData:{
                    name:"",
                    pid:"",
                    pName:""
                },
                updateFormData:{
                    name:"",
                    isDel:""
                },
                isShow:false
            }
        },
        methods: {
            clickNode: function (data) {
                this.addFormData = data;
                this.isShow = true;
                this.addFormData.pid = data.id;
                var label = data.label;
                debugger
                this.updateFormData.name=data.label;
                this.updateFormData.id=data.id;
                this.addFormData.pName = label;
            },
            zhuanhuan:function(){
          for (let i = 0; i <this.ajaxData.length ; i++){
              if(this.ajaxData[i].pid==0){
                  this.digui(this.ajaxData[i]);
                  break;
              }

          }
                console.log(this.jsonStr);
          this.data.push(JSON.parse(this.jsonStr));
            },
            digui:function (node) {
                var df = this.isParent(node);
                if (df==true) {
                    //{"id":1,"label":"分类",}
                    //{"id":1,"label":"分类","children":[]}
                    this.jsonStr += '{"id":' + node.id + ',"label":"' + node.name + '","children":[';
                    let count = 0;
                    for (let i = 0; i < this.ajaxData.length; i++) {
                        //判断当前节点是否有子节点
                        if (node.id == this.ajaxData[i].pid) {
                            count++;
                            this.digui(this.ajaxData[i]);
                            this.jsonStr+=",";
                        }
                    }
                    if (count != 0) {
                        this.jsonStr = this.jsonStr.substr(0, this.jsonStr.length - 1);
                    }
                    this.jsonStr += ']}';
                }else{
                   this.jsonStr+='{"id":'+node.id+',"label":"'+node.name+'"}';

                }

            },
            addType:function (data) {
                this.$ajax.post("http://localhost:8080/api/type/add",this.$qs.stringify(this.addFormData)).then(res=>{
                    this.addData=false;
                }).catch(err=>console.log(err))
            },updateType:function (data) {
                this.$ajax.post("http://localhost:8080/api/type/update",this.$qs.stringify(this.updateFormData)).then(res=>{
                    this.updateData=false;
                }).catch(err=>console.log(err))
            }

        ,isParent:function(node){ // 判断是否为父节点  pid 有没有指向当前id
            for (let i = 0; i <this.ajaxData.length ; i++) {
                if(node.id==this.ajaxData[i].pid){
                    return true;
                }
            }
            return false;
        },add:function () {
                alert()
            }
        },created:function () {
            this.$ajax.get("http://localhost:8080/api/type/getData").then(res=>{
                this.ajaxData=res.data.data;  // 把请求的数据  赋给全局
                this.zhuanhuan();
            }).catch(err=>console.log(err));
        }


    }
</script>
<style scoped>

</style>
