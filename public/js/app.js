// Home wave animation
var myWave = wavify(document.querySelector('#wave-svg'), {
  color: '#eee',
  height: 20,
  bones: 5,
  amplitude: 30,
  speed: .30
})

// Close wave after 900px 
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth <= 900) {
  var videoSource = document.querySelector('.bg-video_source')
  var videoElement = document.querySelector('.bg-video_content')
  videoElement.pause();
  videoSource.removeAttribute('src'); // empty source
  videoElement.load();
  myWave.kill()
}


// Navbar Sticky 
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navigation')

  nav.classList.toggle("navigation_sticky", window.scrollY > 10)

})



// Modal Functionality

const images = document.querySelectorAll('.gallery_img')
const gallery = document.querySelector('.gallery')
const modal = document.querySelector('.modal')
const carousel = document.querySelector('.modal_carousel')
let imagePosition = null
let currentImage = ''
const carouselCounter = document.querySelector('.carousel_counter')

// Image event listener
images.forEach((image) => {
  image.addEventListener('click', (e) => {
    if (e.target.tagName == 'ION-ICON') {
      currentImageSrc = e.target.parentElement.getAttribute('data-source')
      currentImage = e.target.parentElement
    } else {
      currentImageSrc = e.target.getAttribute('data-source')
      currentImage = e.target
    }
    findImagePosition()
    loadModal(currentImageSrc)
  })
})

// Find image position on the DOM
function findImagePosition() {
  for (let i = 0; i < images.length; i++) {
    if (currentImage == images[i]) {
      imagePosition = i
    }
  }
}

// Launch modal and carousel
function loadModal(currentImageSrc) {
  if (viewportWidth >= 600) {
    updateCarouselCounter()
    carousel.style.backgroundImage = `url('${currentImageSrc}')`
    carousel.style.backgroundSize = 'cover'
    carousel.style.backgroundPosition = 'center'
    carousel.style.backgroundRepeat = 'no-repeat'
    modal.style.opacity = '1'
    modal.style.visibility = 'visible'
    carousel.style.transform = 'translate(-50%,-50%) scale(1)'
    carousel.style.opacity = '1'
  }
}

// Close modal with click in empty container
function closeModal(e) {
  if (e.target.classList.contains('modal') || e.target.classList.contains('modal_close')) {

    modal.style.opacity = '0'
    modal.style.visibility = 'hidden'

    carousel.style.transform = 'translate(-50%,-50%) scale(.5)'
    carousel.style.opacity = '0'
  }
}



// Carousel slider
const prev = document.querySelector('.carousel_button-previous')
const next = document.querySelector('.carousel_button-next')

function updateCarouselCounter() {
  carouselCounter.textContent = `${imagePosition + 1}/${images.length}`
}

function slideLeft() {

  let previousImage = ''
  let previousImageSrc = ''
  if (imagePosition == 0) {
    imagePosition = images.length - 1
    previousImage = images[imagePosition]
    previousImageSrc = previousImage.getAttribute('data-source')
    carousel.style.backgroundImage = `url('${previousImageSrc}')`
    updateCarouselCounter()
  } else {
    imagePosition -= 1
    previousImage = images[imagePosition]
    previousImageSrc = previousImage.getAttribute('data-source')
    carousel.style.backgroundImage = `url('${previousImageSrc}')`
    updateCarouselCounter()
  }
  console.log(imagePosition)
}


function slideRight() {

  let nextImage = ''
  let nextImageSrc = ''

  if (imagePosition == images.length - 1) {
    imagePosition = 0
    nextImage = images[imagePosition]
    nextImageSrc = nextImage.getAttribute('data-source')
    carousel.style.backgroundImage = `url('${nextImageSrc}')`
    updateCarouselCounter()
  } else {
    imagePosition += 1
    nextImage = images[imagePosition]
    nextImageSrc = nextImage.getAttribute('data-source')
    carousel.style.backgroundImage = `url('${nextImageSrc}')`
    updateCarouselCounter()
  }
}

prev.addEventListener('click', slideLeft)
next.addEventListener('click', slideRight)
modal.addEventListener('click', function (e) {
  closeModal(e)
})


// Contact form

document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault()
  contact()
})

function contact() {
  const full_name = document.querySelector('#name').value
  const email = document.querySelector('#email').value
  const message = document.querySelector('#message').value
  const date = new Date().toLocaleString('en-GB').toString()
  const modal_verify = document.querySelector('.modal_verify')
  const modal_message = document.querySelector('.verify_message')

  db.collection('contact').add({
    full_name,
    email,
    message,
    message_date: date
  }).then((success) => {
    modal_message.textContent = 'Your message has been succesfully sent!'
    modal_verify.style.display = 'block'
    document.querySelector('.form').reset()
  }).catch((error) => {
    modal_message.textContent = 'Something went wrong,please try again later'
    modal_verify.style.display = 'block'
  })
}
if (document.querySelector('.verify_btn')) {
  document.querySelector('.verify_btn').addEventListener('click', function () {

    document.querySelector('.modal_verify').style.display = 'none'

  })
}



// Navigation Phone Click link

document.querySelectorAll('.navigation-phone_link').forEach((link) => {

  link.addEventListener('click', function () {
    document.querySelector('.navigation-phone_input').checked = false
  })

})


