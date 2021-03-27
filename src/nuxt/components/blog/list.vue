<template>
<div>

    <h4>게시판 리스트</h4>
    <div id="search-box-container">
        <input name="search" id="search-box" type="search"/>
        <label for="search"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg></label>
</div>
<table>
    <tr>
        <th>번호</th>
        <th>구분</th>
        <th>내용</th>
        <th>글쓴이</th>
        <th>날짜</th>
    </tr>
    <tr v-for="(key, i) in keys" :key="i">
        <td>{{i}}</td>
        <td>카테고리1</td>
        <td>블로그내용{{i}}</td>
        <td>홍길동</td>
        <td>2021-03-26</td>
    </tr>

</table>
    <div>pageNumber : <span v-for="(pageCount, i) in pageCount" :key="i"><a href="#" @click="pageChange($event)">{{pageCount}}</a></span></div>
</div>
</template>
<script>
export default {
    data(){
        return {
        keys:[],
        keysGet:["1"],
        test:[],
        //PAGENATI
        i:0,
        j:0,
        pageIndex: 0,
        }
    },
    computed:{
        pageCount : function(){
            var arr=[];
            for(var i=0; i<this.test.length; i++){
                arr[i]= i+1;
            }
            return arr
        }
    },
    methods:{
        pageChange: function(event) {
            console.log(event.target);
            this.pageIndex = event.target.innerHTML -1;
            console.log(this.pageIndex);

            this.keys = this.test[this.pageIndex];
            
        }
    },
    created() {
        //키값을 가져온다.(데이터 가져옴)
        this.keysGet=["1","2","3","4","5","6","7","8","9","10","11","12","1","2","3","4","5","6","7","8","9","10","11","12"]
        
        //열개씩 분리해서 다차원배열에 담기 (test[])


        Array.prototype.division = function(n){
            var arr = this;
            var len = arr.length;
            var cnt = Math.floor(len / n ) + (Math.floor(len % n) > 0 ? ! 1 : 0);
            var tem = [];

            for(var i = 0; i < cnt; i ++ ){
                tem.push(arr.splice(0,n));
            }
            return tem;
        } 
        this.test = this.keysGet.division(10);
        console.log(this.test.length);


        //페이지 네비게이션 렌더링

        this.keys= this.test[1];


         
         

    }
}
</script>

<style scoped>
/*검색바 스타일 */

#search-box-container{
    width: 1010px;
    text-align: center;
}
#search-box-container input:focus{
    outline:none;
     border: 3px solid black;
}
#search-box-container input:hover, #search-box-container input:active {
    border: 3px solid black;
    transition: ease border 0.4s;
}
#search-box-container input{
    width: 600px;
    padding: 12px;
    border-radius: 12px;
    border: 3px solid #f3f3f3;
}
#search-box-container input+label{
    margin: -40px;
}

/*게시판 테이블 스타일*/
table{
    margin: 20px;
    width: auto;
    border-bottom: solid 2px #2b2b2b;
    border-top: solid 2px #2b2b2b;
}
tr:nth-of-type(1)/**제목표시 */{

    border-bottom: solid 1px #9e9e9e;
}
th{
    text-align: center;
    margin-top: 12px;
    margin-bottom: 12px;
}
td{    text-align: center;
    padding: 12px;
}
td:nth-of-type(1){
    width: 100px;
}
td:nth-of-type(2){
    width: 200px;
}
td:nth-of-type(3){
    width: 400px;    
}
td:nth-of-type(4){
    width: 200px;
}
td:nth-of-type(5){
    width: 110px;
}
</style>
