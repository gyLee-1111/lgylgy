<template>
<h2>리스트목록 {{userStore.userId}}</h2>
  <div>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>상품코드</th>
          <th>상품명</th>
          <th>결제금액</th>
       

          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.productCode" @click="detailProduct(item.productCode)">
          <td>{{ item.rseq }}</td>
          <td>{{ item.productCode }}</td>
          <td>{{ item.productNm }}</td>
          <td>{{ item.productPrice }}</td>

          <td>
            <button @click.stop="deleteProduct(item.productCode)">삭제</button>
          </td>



        </tr>

      </tbody>
    </table>
  </div>
  <button @click="InsertProduct">등록</button>
  
</template>

<script>
import { ref, onMounted } from 'vue'
//import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import api from '@/plugins/api'



export default {
  name: "TestComponent",
  // 피니아
  setup() {
    const userStore = useUserStore();

    return{
      userStore
    };

  },
  data() {
    return {
          items: [ ],
          userStore: useUserStore()
    }
  },
  mounted() {
    this.getList();
    
  },
  methods: {

    InsertProduct(){
      this.$router.push('/productOrder/InsertProduct')
    },


   async getList() {
    
     // axios.get('http://localhost:8081/front/bmm/getListProduct')
     // .then(res => {
     //   alert(res.status);
     //   this.items = res.data
     //   console.log(res);
     // })
     // .catch(err => {
     //   console.error(err)
        //this.response = '연결 실패'
     // })
      //userStore
      //유저id 기준으로
    
      const response = await api.get('http://localhost:8081/front/bmm/getListProduct',{
        params:{
          userId:this.userStore.userId
        }
      });

      if(response.status==200) {
      // alert("이건영좌");
        this.items = response.data
      }
      else{
        alert("잘못된 요청입니다.");
      }

    },
    detailProduct(keywordCode) {
      this.$router.push('/productOrder/DetailProduct/' + keywordCode);
      alert(keywordCode);
    },
    async deleteProduct(productCode) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await api.delete('http://localhost:8081/front/bmm/deleteProduct', {
        params: { productCode }
        });
      alert(response.data); 
      this.getList(); 
      } catch (error) {
      console.error(error);
      alert('삭제 실패');
      }
    }
  }
 
}
</script>

<style scoped>
/*브라우저에서 api를 호출하면 크로스 도메인 에러가 발생 스프링 부트쪽에서 경로를 열어주는 작업을 해야함 or  서버를 통해 리턴받는걸로 작업*/
</style>