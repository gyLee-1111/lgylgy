<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>{{}}</h1>
                </div>
            </div>

            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">
                            <!-- 공지사항 기본 리스트 -->
                            <!-- 공지사항 상세보기 -->
                        <div class="board_view_rwd" v-if="upperPost">
                            <div class="board_top">
                                <strong class="title">{{ upperPost.postNm }}</strong>
                            </div>
                            <div class="board_info">
                                <div class="date">
                                    <i class="fa-regular fa-clock"></i> {{ upperPost.insertDt }} / 조회수: {{ upperPost.viewCount }}
                                </div>
                                <div class="writer"><i class="fa-solid fa-user-pen"></i> {{ upperPost.insertUserId }}</div>
                            </div>
                            <div class="board_content">
                                <div class="board_content" v-html="upperPost.postInfo"></div>
                            </div>
                            <div class="file_inner">
                                <div class="file_list">
                                    <a v-for="upperItem in upperPostFile" :key="upperItem.postCode" @click="fileDownload(upperItem.fileNo)">
                                        <i class="ri-download-cloud-line"></i> {{ upperItem.fileNm }}</a>
                                    <!-- <a href="#"><i class="ri-download-cloud-line"></i> favicon.png</a> -->
                                </div>
                            </div>
                        </div>

                         <div class="board_view_rwd" v-if="post">
                            <div class="board_top">
                                <strong class="title">{{ post.postNm }}</strong>
                            </div>
                            <div class="board_info">
                                <div class="date">
                                    <i class="fa-regular fa-clock"></i> {{ post.insertDt }} / 조회수: {{ post.viewCount }}
                                </div>
                                <div class="writer"><i class="fa-solid fa-user-pen"></i> {{ post.insertUserId }}</div>
                            </div>
                            <div class="board_content">
                                <div class="board_content" v-html="post.postInfo"></div>
                            </div>
                            <div class="file_inner">
                                <div class="file_list">
                                    <a v-for="item in postFile" :key="item.postCode" @click="fileDownload(item.fileNo)">
                                        <i class="ri-download-cloud-line"></i> {{ item.fileNm }}</a>
                                    <!-- <a href="#"><i class="ri-download-cloud-line"></i> favicon.png</a> -->
                                </div>
                            </div>                            
                        </div>

                        <!-- 게시판 글 작성 폼 -->
                    <div v-if="showAnswerForm">
                        <table class="basic_write mg_t50">
                            <colgroup>
                                <col width="30%"/>
                                <col />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>제목<span class="fc_requisite">*</span></th>
                                    <td><input type="text" v-model="answerPost.postNm" placeholder="제목을 입력해주세요."></td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td><QuillEditor v-model:content="answerPost.postInfo" contentType="html" style="height: 300px"/></td>
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
                                    <button class="btn bg_blue" @click="insertAnswerPost"><i class="ri-check-line"></i> 등록하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                        <!--// 게시판 글 작성 폼 -->

                        <!-- 리플화면 -->
                         <div class="table_container_outer" v-if="commentList.length > 0">
                            <div class="table_container">
                                <table class="basic_write mg_t50">
                                    <colgroup>
                                        <col width="10%"/>
                                        <col width="70%"/>
                                        <col width="10%"/>
                                        <col width="10%"/>
                                    </colgroup>
                                    <tbody>
                                        
                                        <tr v-for="item in commentList" :key="item.commentCode">
                                            <td><span v-if="item.dethp > 1" class="reply-arrow">
                                                    <span v-for="n in item.dethp - 1" :key="n">
                                                        <td>-></td>
                                                    </span>
                                                </span>{{ item.insertUserId }}<span class="fc_requisite">*</span></td>
                                            <td @click="showRecomment(item.commentCode)">{{ item.commentContent }}</td>
                                            <td v-if="userId">
                                                <button @click="openCommentUpdateModal(item.commentCode)">수정</button><br>
                                                <button @click="deleteComment(item.commentCode)">삭제</button>
                                            </td>
                                            <td>{{ item.insertDt }}<span class="fc_requisite">*</span></td>
                                        </tr>
                                        
                                    </tbody>
                                    <!-- 대댓글 입력창 -->
                                    <!-- <tr v-if="activeRecomment" :item="selectedComment" :selectedCommentCode="selectCommentCode"
                                    :commentCode="selectedCommentCode"> -->
                                    <tr v-if="activeRecommentCode">
                                        <td colspan="3">
                                            <textarea v-model="reCommentContent" placeholder="대댓글을 입력하세요" style="width: 100%"></textarea>
                                            <button class="btn bg_white" @click="insertReComment(selectedCommentCode)">대댓글 등록</button>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                         
                        <!-- //리플화면 -->

                        <!-- 리플 등록-->
                        <table class="basic_write mg_t50">
                            <colgroup>
                                <col width="10%"/>
                                <col width="70%"/>
                                <col width="10%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>리플 남기기<span class="fc_requisite">*</span></th>
                                    <td><textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea></td>
                                    <th><button class="btn bg_whight" @click="insertComment"><i class="ri-check-line"></i> 등록</button><span class="fc_requisite">*</span></th>
                                </tr>
                            </tbody>
                        </table>
                        <!-- //리플등록 -->
                        <div class="table_btn_func mg_b50">
                            <div class="grid2">
                                <div class="left">
                                    <button class="btn bg_white" @click="goBack"><i class="ri-file-list-3-line"></i> 목록보기</button>
                                </div>
                                <div class="right" v-if="post && userId === post.insertUserId">
                                    <button class="btn bg_blue" @click="deletePost"><i class="ri-edit-line"></i> 삭제하기</button>
                                </div>
                                <div class="right" v-if="post && userId === post.insertUserId">
                                    <button class="btn bg_blue" @click="goUpdatePost"><i class="ri-edit-line"></i> 수정하기</button>
                                </div>
                                <div class="right" v-if="post && post.answerCheck === 'Y' && post.noticeCheck === 'N'">
                                    <button class="btn bg_blue" @click="onClickAnswer"><i class="ri-edit-line"></i> 답변달기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <!-- 모달영역 -->
            <CommentPop
                v-if="commentUpdateModalOpen"

                :commentCode="selectedCommentCode"
                @close="closeCommentUpdateModal">
            </CommentPop>
            


            <!--// 모달영역 -->


        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../../plugins/api'
import { useRoute,useRouter } from 'vue-router'
import BoardCommon from './BoardCommon.vue'
import { useAuthPinia } from '../../store/authPinia'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'dropzone/dist/dropzone.css'
import Dropzone from 'dropzone'
import { nextTick } from 'vue'

import CommentPop from '../../components/CommentPop.vue'
import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'


Dropzone.autoDiscover = false;

export default {
    name: "DetailPost",
    components: {
        QuillEditor,
        CommentPop
    },
    setup() {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        const post = ref(null)
        const upperPost = ref(null)
        const route = useRoute()
        const router = useRouter()
        const postCode = route.params.postCode || ''
        const postFile = ref([])
        const upperPostFile = ref([])
        const commentList = ref([])
        const newComment = ref('')
        const reCommentContent = ref('')
        const selectedCommentCode = ref(null)
        const selectedComment = ref(null)
        const activeRecommentCode = ref(null)
        const authStore = useAuthPinia()
        const userId = authStore.userId

        const showAnswerForm = ref(false)

        const dropzoneInstance = ref(null)

        const uploadedFiles = ref([])

        const answerPost = ref({
            postNm:'',
            postInfo:'',
            noticeCheck:'N',
            secretCheck:'N',
            upperCode:''
        })

        const dropZoneRun = () => {
            if (dropzoneInstance.value) {
                dropzoneInstance.value.destroy();
                dropzoneInstance.value = null;
            }
            dropzoneInstance.value = new Dropzone("#demo-upload", {
                url: apiBaseUrl +'/user/board/insertFile',
                autoProcessQueue: false,
                paramName: 'file',
                maxFiles: 10,
                maxFilesize: 10, // MB
            //    acceptedFiles: ".hwp,.doc,.pdf,.jpg,.gif,.png,.txt",
                acceptedFiles: null,
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
                    goBoardCommon();
                });
                }
            })
        }

        const onClickAnswer = async () => {
            showAnswerForm.value = true

            answerPost.value = {
                postNm: 're:' + post.value.postNm,
                postInfo:'',
                noticeCheck:'N',
                secretCheck:'N',
                upperCode: post.value.postCode

            }
            await nextTick()
            dropZoneRun()
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

        const getDetailUpperPost = async (postCode) => {
            try {
                const response = await api.get('/user/board/getDetailUpperPost',{
                params: { postCode }
                })
                upperPost.value = response.data.commonPostDto
                upperPostFile.value = response.data.boardFileDto

            } catch(error) {
                console.error('게시판 상세 조회 오류:', error)
            }
        }

        const fileDownload = async (fileNo) => {
            try {
                const res = await api.get('/user/board/fileDownload',{
                    params:{fileNo},
                    responseType: 'blob',
                })

                const disposition = res.headers.get('content-disposition');
                console.log('Content-Disposition:', disposition);

                const fileNameMatch = disposition && disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
                const fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1].replace(/['"]/g, '')) : 'download_file'
                console.log(res.headers);
                
            //    const contentType = res.headers['content-type'] || 'application/octet-stream';

            //    const blob = new Blob([res.data], { type: contentType });
                const blob = new Blob([res.data]);
                const url = window.URL.createObjectURL(blob)

                const link = document.createElement('a');

                link.href = url;

                link.download = fileName;
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link)
                
                window.URL.revokeObjectURL(url)

            } catch(error) {
                console.error('파일 다운로드 오류:', error)
            }
        }

        const getListComment = async(postCode) =>{
            try{
                const res = await api.get('/user/board/getListComment',{
                    params: { postCode }
                    })
                if(res.status==200) {
                    commentList.value = res.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error) {
                console.error(error)
            }

        }
        const insertComment = async() =>{
            if (!newComment.value.trim()) {
                alert('댓글 내용을 입력해주세요.');
                return;
            }
            
            try {
                const res = await api.post('/user/board/insertComment',{
                    postCode,
                    commentContent: newComment.value
                })
                if(res.status === 200){
                    alert('댓글이 등록되었습니다.');
                    newComment.value = '';
                    await getListComment(postCode)
                } else{
                    alert("등록 실패.");
                }

            } catch (error) {
                console.error(error)
            }

        }
        const insertReComment = async(commentCode) =>{
            console.log('commentCode:', commentCode)
            console.log('reCommentContent:', reCommentContent.value)
            if (!reCommentContent.value.trim()) {
                alert('aaa댓글 내용을 입력해주세요.');
                return;
            }
            
            try {
                const res = await api.post('/user/board/insertReComment',{
                    commentCode,
                    commentContent: reCommentContent.value
                })
                if(res.status === 200){
                    alert('댓글이 등록되었습니다.');
                    reCommentContent.value = '';
                    activeRecommentCode.value = null
                    await getListComment(postCode)
                } else{
                    alert("등록 실패.");
                }

            } catch (error) {
                console.error(error)
            }

        }

        const insertAnswerPost = async() =>{
            if (!post.value || !post.value.postCode) {
                alert('게시글 정보가 아직 로딩되지 않았습니다.')
                return
            }
            answerPost.value.boardCode = post.value.boardCode
            answerPost.value.dethp = post.value.dethp
            try{
                const answerPostRes = await api.post('/user/board/insertAnswerPost',answerPost.value)
                
                if(answerPostRes.status==200) {
                    alert('답변 등록')
                    const answerPostCodeValue = answerPostRes.data;
                    dropzoneInstance.value.options.params = { postCode: answerPostCodeValue };
                     if (dropzoneInstance.value.getQueuedFiles().length > 0) {
						
						dropzoneInstance.value.processQueue();
                        showAnswerForm.value = false
                    }else {
                        alert('답변 등록 파일없음.')
                        showAnswerForm.value = false
                    }
               
                }else{
                    alert('답변등록 실패')
                }
            } catch (error) {
                console.error(error)
            }
        }

        const deletePost = async() => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            try {
                const response = await api.post('/user/board/deletePost', { postCode: postCode });
                if(response.status == 200){
                   console.log('게시물 삭제 성공:', response.data)
                   alert('게시물 삭제 완료.')
                }
                goBack()
            } catch (error) {
                console.error('게시물 삭제 실패:', error)
                alert('게시물 삭제 실패.')
            }

        }

        const deleteComment = async(commentCode) => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            try {
                const response = await api.post('/user/board/deleteComment', { commentCode });
                if(response.status == 200){
                   console.log('게시물 삭제 성공:', response.data)
                   alert('게시물 삭제 완료.')
                }
                location.reload();
            } catch (error) {
                console.error('게시물 삭제 실패:', error)
                alert('게시물 삭제 실패.')
            }

        }



/*
        const showRecomment = (commentCode) => {
            selectedCommentCode.value = commentCode
            selectedComment.value = commentList.value(comment => comment.commentCode === commentCode) || null;
            activeRecomment.value = true;
            
        }
*/
        const showRecomment = (commentCode) => {
            if (activeRecommentCode.value === commentCode) {
                activeRecommentCode.value = null
                
            } else {
                activeRecommentCode.value = commentCode
                selectedCommentCode.value = commentCode
            }
        }
        const goUpdatePost = async() =>{
            router.push('/updatePost/' + postCode)
        }

        const goBack = async() =>{


           router.push('/boardCommon/' + post.value.boardCode)
        }
        
   
        const commentUpdateModalOpen = ref(false)

        const openCommentUpdateModal = async(commentCode) => {
            console.log('모달 열기 시도, commentCode:', commentCode)
            selectedCommentCode.value = commentCode
            commentUpdateModalOpen.value = true;
            document.body.style.overflow = 'hidden';

            openModalBackGround();
        }

        const closeCommentUpdateModal = () => {

            commentUpdateModalOpen.value = false
            document.body.style.overflow = 'auto'
            location.reload();
            closeModalBackGround();
        }
   
        onMounted(() => {
            getDetailPost(postCode)
            getListComment(postCode)
            getDetailUpperPost(postCode)
        })
    
        return {
            getDetailPost,
            post,
            postFile,
            fileDownload,
            getListComment,
            commentList,
            insertComment,
            newComment,
            showRecomment,
            insertReComment,
            selectedCommentCode,
            selectedComment,
            activeRecommentCode,
            reCommentContent,
            userId,
            onClickAnswer,
            showAnswerForm,
            answerPost,
            insertAnswerPost,
            getDetailUpperPost,
            upperPost,
            upperPostFile,
            dropZoneRun,
            apiBaseUrl,
            goUpdatePost,

            goBack,
            deletePost,
            deleteComment,

            commentUpdateModalOpen,
            openCommentUpdateModal,
            closeCommentUpdateModal,
        }   
    }
}


</script>

<style scoped>

</style>