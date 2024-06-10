document.addEventListener('DOMContentLoaded', () => {
    slider();
    rating();
});

function slider() {
    new Swiper ('.swiper', {
        slidesPerView:1,
        pagination: {
            el: '.swiper-pagination',
            clikable: true,
        },
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000
        },
    });
}

function rating() {
    const stars = document.querySelectorAll('.star');
    const ratingResult = document.getElementById('ratingResult');
    let selectedRating = 0;
    
    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => {
        for (let i = 0; i <= index; i++) {
          stars[i].style.backgroundColor = '#00b57a';
        }
      });
    
      star.addEventListener('mouseleave', () => {
        stars.forEach((star, i) => {
          if (i >= selectedRating) {
            star.style.backgroundColor = '#ccc';
          }
        });
      });
    
      star.addEventListener('click', () => {
        selectedRating = index + 1;
        displayRating(selectedRating);
      });
    });
    
    function displayRating(rating) {
      ratingResult.innerHTML = `${rating} out of 5`;
    }
}









