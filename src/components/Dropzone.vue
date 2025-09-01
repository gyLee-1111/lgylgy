<!-- <template>
  <form ref="dropzoneRef" class="dropzone"></form>
</template>


<script>
import { onMounted,ref } from 'vue'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

const dropzoneRef = ref(null)


export default {
    components: { MultiFileUpload },
    setup() {
        const uploadedFiles = ref([])

        const onSuccess = (file, response) => {
        uploadedFiles.value.push(file)
        alert(`${file.name} 업로드 성공!`)
        }

        const onError = (file, error) => {
        alert(`${file.name} 업로드 실패: ${error}`)
        }
        onMounted(() => {
            new Dropzone(dropzoneRef.value, {
                url: 'upload',  // Spring Boot의 파일 업로드 URL
                maxFiles: 5,
                maxFilesize: 10, // MB
                acceptedFiles: '.jpg,.png,.pdf,.docx',
                addRemoveLinks: true,
                dictDefaultMessage: "여기로 파일을 드래그 하거나 클릭해서 업로드하세요",
            })
        })

        return {
        uploadedFiles,
        onSuccess,
        onError
        }
    }
}
</script> -->