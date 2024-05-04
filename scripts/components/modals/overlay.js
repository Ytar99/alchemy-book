export class ModalOverlay {
  id = "";
  element = null;
  shouldCloseOnClick = true;
  handleCloseModal = () => {};

  constructor(id, handleCloseModal, shouldCloseOnClick = true) {
    this.id = id;
    this.shouldCloseOnClick = shouldCloseOnClick;
    this.handleCloseModal = handleCloseModal;
  }

  render() {
    const overlay = document.createElement("div");
    overlay.id = `overlay-${this.id}`;
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.bottom = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.backdropFilter = "blur(3px)";
    overlay.style.zIndex = "100";

    overlay.addEventListener("click", () => {
      if (this.shouldCloseOnClick) {
        this.destroy();
      }
    });

    this.element = overlay;
    document.body.appendChild(overlay);
  }
  destroy() {
    if (this.element) {
      this.handleCloseModal();
      this.element.remove();
      this.element = null;
    }
  }
}
