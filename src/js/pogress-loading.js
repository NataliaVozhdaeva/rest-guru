const progressiveLoading = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const progressiveImages = document.querySelectorAll('.item-img');

    progressiveImages.forEach((el) => {
      const lowResImage = new Image();
      lowResImage.src = el.src;
      lowResImage.onload = function () {
        el.src = el.dataset.src;
      };
    });
  });

export default progressiveLoading;
