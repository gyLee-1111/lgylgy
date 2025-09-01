<template>
  <div class="content_page">

    <div class="base_width">

        <div class="content_box_white">
            <div class="content_inline">
                <h1>{{boardNm}}</h1>
                <h2 class="title_pg">게시판용 formcontents</h2>
                <span class="ment">각종 게시판용 input, textarea, select 등 모음</span>                    
            </div>
        </div>

        <div class="content_box_white">
            <div class="content_body">
                <div class="form_contents_box">
                <!-- 공지사항 기본 리스트 -->
                                                <!-- 게시판 글 작성 폼 -->
                        <table class="basic_write mg_t50">
                            <colgroup>
                                <col width="30%"/>
                                <col />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>제목<span class="fc_requisite">*</span></th>
                                    <td><input type="text" v-model="post.postNm" placeholder="제목을 입력해주세요."></td>
                                </tr>
                                <tr v-if="useNotice === 'Y'">
                                    <th>최상단 공개</th>
                                    <td>
                                        <label>
                                            <input type="radio" value="Y" v-model="post.noticeCheck"/>
                                            <span>최상단</span>
                                        </label>
                                        <label>
                                            <input type="radio" value="N" v-model="post.noticeCheck"/>
                                            <span>일반</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr v-if="useSecret === 'Y'">
                                    <th>비밀글 사용</th>
                                    <td>
                                        <label>
                                            <input type="radio" value="Y" v-model="post.secretCheck" />
                                            <span>비밀글</span>
                                        </label>
                                        <label>
                                            <input type="radio" value="N" v-model="post.secretCheck" />
                                            <span>일반</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td><QuillEditor v-model:content="post.postInfo" contentType="html" style="height: 300px"/></td>
                                </tr>

                                
                                <tr>
                                    <th>파일첨부</th>
                                    <td>
                                        <div id="dropzone">
                                            <form action="https://httpbin.org/post" class="dropzone needsclick" id="demo-upload">
                                                <div class="dz-message needsclick">
                                                <span class="text">
                                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                                    Drop files here or click to upload.
                                                </span>
                                                <span class="plus">+</span>
                                                </div>
                                            </form>
                                        </div>

                                        <div class="mg_t5">
                                            ※ 첨부파일 형식: 문서 및 이미지 파일<br/>
                                            ※ 파일확장자: hwp, doc, pdf, jpg, gif, png
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="table_btn_func">
                            <div class="grid2">
                                <div class="left">
                                    <button class="btn bg_white"><i class="ri-file-list-3-line"></i> 목록보기</button>
                                </div>
                                <div class="right">
                                    <button class="btn bg_blue" @click="insertPost"><i class="ri-check-line"></i> 등록하기</button>
                                </div>
                            </div>
                        </div>
                        <!--// 게시판 글 작성 폼 -->
                    </div>

                </div>

            </div>

        </div>

  </div>

</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../../plugins/api'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
import { useAuthPinia } from '../../store/authPinia'
import 'dropzone/dist/dropzone.css'
import Dropzone from 'dropzone'

Dropzone.autoDiscover = false;

export default {
  name: "InsertPost",
  props: {
    boardCode: {
        type: String,
        required: true
    }
  },
  components: {
    QuillEditor
  },
  setup(props) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const authStore = useAuthPinia()

    const boardCode = ref(props.boardCode)
    const board = ref(null)
    const boardNm = ref('')
    const useAnswer = ref('')
    const useComment = ref('')
    const useNotice = ref('')
    const useSecret = ref('')

    const postList = ref([])
    const post = ref({
        postNm:'',
        postInfo:'',
        noticeCheck:'N',
        secretCheck:'N'
    })
    const postCode = ref('')

    const router = useRouter()

    const dropzoneInstance = ref(null)

    const uploadedFiles = ref([])
    
    const getDetailBoard = async() =>{
        try{
            const response = await api.get('/user/board/getDetailBoard',{
            params: { boardCode: props.boardCode }
            })
       
            board.value = response.data
            boardCode.value = response.data.boardCode
            boardNm.value = response.data.boardNm
            useAnswer.value = response.data.useAnswer
            useComment.value = response.data.useComment
            useNotice.value = response.data.useNotice
            useSecret.value = response.data.useSecret
            
      
        } catch (error){
            console.error(error)
        }
        
    }

    const getListPost = async() =>{
        try{
            const res = await api.get('/user/board/getListPost',{
                params:{ boardCode: props.boardCode }
            })
            if(res.status==200) {
                postList.value = res.data
            }
            else{
                alert("잘못된 요청입니다.");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const insertPost = async() =>{
        if (!post.value.postNm.trim()) {
                alert('게시물 제목을 입력해주세요.');
                return;
        }
        post.value.boardCode = boardCode.value
        try{
            const insertPostResponse = await api.post('/user/board/insertPost',post.value)
            console.log('insertPostResponse.data.postCode:', insertPostResponse.data.postCode);
            if(insertPostResponse.status==200) {
                alert('게시물이 등록되었습니다.')

                const postCodeValue = insertPostResponse.data;
                dropzoneInstance.value.options.params = { postCode: postCodeValue };
                if (dropzoneInstance.value.getQueuedFiles().length > 0) {
						
						dropzoneInstance.value.processQueue(); 
                        goBoardCommon();
                } else {
                    alert('게시물 등록 파일없음.')
                    goBoardCommon();
                }
              
            }
            else{
                alert("등록 실패.");
            }
        } catch (error) {
            console.error(error)
        }
        
    }
    const goBoardCommon = () => {
        router.push('/BoardCommon/' + boardCode.value )
    }
    

    const dropZoneRun = () => {
        dropzoneInstance.value = new Dropzone("#demo-upload", {
            url: apiBaseUrl +'/user/board/insertFile',
            autoProcessQueue: false,
            paramName: 'file',
            maxFiles: 10,
            maxFilesize: 5, // MB
            acceptedFiles: ".hwp,.doc,.pdf,.jpg,.gif,.png",
            addRemoveLinks: true,
            dictDefaultMessage: "파일을 드래그하거나 클릭하여 업로드하세요.",
            dictRemoveFile: "삭제",
           
            init: function () {
            this.on("sending", (file, xhr, formData) => {
                xhr.setRequestHeader("Authorization", `Bearer ${authStore.token}`);
                xhr.withCredentials = true; // 필요 시
            if (this.options.params) {
                Object.entries(this.options.params).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                }
            });
            this.on("success", (file, response) => {
                console.log("업로드 성공", file, response)
         
            })
            this.on("error", (file, errorMessage) => {
                console.error("업로드 실패", file, errorMessage)
            })
            this.on("queuecomplete", () => {
                // 모든 파일 업로드가 끝났을 때 호출
                alert("모든 파일 업로드가 완료되었습니다.");
                goBoardCommon();
            });
            }
        })
    }


    onMounted(() => {
        getDetailBoard()
        getListPost()
        dropZoneRun()

    })
    
    return {
        getDetailBoard,
        getListPost,
        board,
        boardCode,
        boardNm,
        useAnswer,
        useComment,
        useNotice,
        useSecret,
        postList,
        insertPost,
        post,
        dropZoneRun,
        apiBaseUrl,
    }
  }
}


</script>

<style scoped>

</style>