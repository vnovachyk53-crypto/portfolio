"use strict"
document.addEventListener('click', documentActions)

function documentActions(e) {
	const targetElement = e.target

	if (targetElement.closest('.icon-menu')) {
		document.documentElement.toggleAttribute('data-menu-open')
	}
}

const heroButton = document.querySelector('.hero__top-button');


heroButton.addEventListener('mouseenter', buttonHover);
heroButton.addEventListener('mouseleave', buttonReset);

function buttonHover() {
  const img = heroButton.querySelector('img'); 

  if (img) {
    img.src = 'img/hero/hover_arrow.svg';
	heroButton.classList.add('hovered')
  }
}
function buttonReset() {
  const img = heroButton.querySelector('img');
  
  if (img) {
    img.src = 'img/hero/arrow.svg';
	heroButton.classList.remove('hovered') 
  }
}

const callButton = document.querySelector('.hero__button');

if (callButton) {
    callButton.addEventListener('click', clickOnButton);
}

function clickOnButton() {
    alert("Ви записались");
}

document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.client__slider');

    if (!slider) return;

    const track = slider.querySelector('.slider__track');
    const prevButton = slider.querySelector('.slider__arrow.left button');
    const nextButton = slider.querySelector('.slider__arrow.right button');

    if (!track || !prevButton || !nextButton) return;

    let currentIndex = 0;

    const getCards = () => {
        return [...track.querySelectorAll('.slider__item')];
    };

    function getVisibleCount() {
        return window.innerWidth <= 767 ? 1 : 2;
    }

    function updateSlider() {

        const cards = getCards();

        if (cards.length === 0) {
            prevButton.disabled = true;
            nextButton.disabled = true;
            return;
        }

        const maxIndex = Math.max(0, cards.length - getVisibleCount());


        currentIndex = Math.min(currentIndex, maxIndex);

        const cardWidth = cards[0].getBoundingClientRect().width;

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
    }


    prevButton.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);

    const observer = new MutationObserver(updateSlider);

    observer.observe(track, {
        childList: true
    });

    updateSlider();

});

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const button = item.querySelector('.faq__button');
    const answer = item.querySelector('.faq__answer');

    button.addEventListener('click', () => {
        const isOpen = item.classList.toggle('active');

        button.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0px';
        }
    });
});