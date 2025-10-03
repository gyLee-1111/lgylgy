<template>
  <div class="content_page">

    <div class="base_width">

        <div class="content_box_white">
            <div class="content_inline">
                <h1>{{ post.postNm || '게시물 수정' }}</h1>
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
                                 <tr v-if="noticeCheck === 'Y' || noet">
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
                                    <th>첨부파일</th>
                                    <td v-for="item in postFile" :key="item.postCode" @click="fileDelete(item.fileNo)">
                                        <i class="ri-download-cloud-line"></i> {{ item.fileNm }}
                                    </td>
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
                                    <button class="btn bg_white" @click="goBack"><i class="ri-file-list-3-line"></i> 목록보기</button>
                                </div>
                                <div class="right">
                                    <button class="btn bg_blue" @click="updatePost"><i class="ri-check-line"></i> 수정하기</button>
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
import { useAuthPinia } from '../../store/authPinia'
import 'dropzone/dist/dropzone.css'
import Dropzone from 'dropzone'
import { useRouter } from 'vue-router';

Dropzone.autoDiscover = false;

export default {
  name: "UpdatePost",
  props: {
    postCode: {
        type: Number,
        required: true
    }
  },
  components: {
    QuillEditor
  },
  setup(props) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const authStore = useAuthPinia()

    const router = useRouter();
    const postCode = ref(props.postCode);

//    const postList = ref([])
    const post = ref({
        postNm:'',
        postInfo:'',
        noticeCheck:'N',
        secretCheck:'N'
    })

    const postFile = ref([]);

    const dropzoneInstance = ref(null)

   

    const dropZoneRun = () => {
        dropzoneInstance.value = new Dropzone("#demo-upload", {
            url: apiBaseUrl +'/user/board/insertFile',
            autoProcessQueue: false,
            paramName: 'file',
            maxFiles: 10,
            maxFilesize: 10, // MB
            acceptedFiles: ".hwp,.doc,.pdf,.jpg,.gif,.png,.txt",
        //    acceptedFiles: null,
            addRemoveLinks: true,
            dictDefaultMessage: "파일을 드래그하거나 클릭하여 업로드하세요.",
            dictRemoveFile: "삭제",
            parallelUploads: 5,
           
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
             
            });
            }
        })
    }
    const getDetailPost = async (postCode) => {
            try {
                const response = await api.get('/user/board/getDetailPost',{
                params: { postCode }
                })
                post.value = response.data.commonPostDto
                postFile.value = response.data.boardFileDto

            } catch(error) {
                console.error('게시판 상세 조회 오류:', error)
            }
        }

    const updatePost = async () => {
        console.log('업데이트할 데이터:', post.value);
        // const params = {
        //     commonPostDto: post.value,
        // }


        try {
            const response = await api.post('/user/board/updatePost', post.value);
            if(response.status==200) {
                alert('게시물이 등록되었습니다.')

                const postCodeValue = response.data;
                dropzoneInstance.value.options.params = { postCode: postCodeValue };

            if (dropzoneInstance.value.getQueuedFiles().length > 0) {
				
				dropzoneInstance.value.processQueue(); 
                        
                } else {
                    alert('게시물 등록 파일없음.')
                    goBack();
                }

            }
            else{
                 alert("수정 실패.");
            }
            alert('게시물 수정 완료.');
            console.log('게시물 수정 성공:', response.data);
            goBack()
        } catch (error) {
            console.error('게시물 수정 실패:', error);
            alert('게시물 수정 실패.');
        }
    };


    const fileDelete = async (fileNo) => {
        if (!confirm('정말 삭제하시겠습니까? 삭제된 파일은 복구되지 않습니다')) {
                return
            }

        try {
            const res = await api.post('/user/board/fileDelete',{ fileNo })
            if(res.status == 200){
                console.log('첨부파일 삭제 성공:', res.data)
                alert('첨부파일 삭제 완료.')
            }
        } catch(error) {
            console.error('파일 삭제 오류:', error)
            if (error.response) {
            console.error('HTTP 상태 코드:', error.response.status);
            } else {
            console.error('응답 없음 - 인증 실패 또는 네트워크 문제');
            }
        }
    }

    



    const goBack = () => {
        router.push('/DetailPost/' + postCode.value)
    }


    onMounted(() => {
        //console.log("postCode:", postCode.value)
        getDetailPost(postCode.value)
    //    getListPost()
        dropZoneRun()

    })
    
    return {
      post,
      postFile,
      updatePost,
      goBack,
      fileDelete,


    }
  }
}


</script>

<style scoped>

</style>