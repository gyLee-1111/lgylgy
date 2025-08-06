import { useModalStore } from '../store/modal';

export function openModalBackGround() {
    const modalStore = useModalStore();
    modalStore.openModal(); // 모달 상태 true로 변경
  return
}
export function closeModalBackGround() {
    const modalStore = useModalStore();
    modalStore.closeModal(); // 모달 상태 true로 변경
  return
}