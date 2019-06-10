const btnPromise = document.querySelector('#btn-promise');
const myImage = document.querySelector('#img');
const imageUrl = 'https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg';


class EventObserver {
  constructor () {
    this.observers = []
  }

  subscribe (fn) {
    this.observers.push(fn)
  }

  unsubscribe (fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn)
  }

  broadcast (data) {
    this.observers.forEach(subscriber => subscriber(data))
  }
}

const imgObserver = new EventObserver();

btnPromise.onclick = () => {
  updateBodyBg();
};

imgObserver.subscribe(isTrue => {
  isTrue
})

const updateBodyBg = () => {
  const htmlBody = document.querySelector('body');

  htmlBody.style.backgroundColor = '#000';

  setTimeout(() => {
    imgObserver.broadcast(myAsyncFunction(imageUrl));
    htmlBody.style.backgroundColor = '#fff';
  }, 1000);
};

const myAsyncFunction = (url) => {
  fetch(url).then(function(response) {
    return response.blob();
  }).then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
};