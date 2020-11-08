const li = Array.from(document.querySelectorAll('li'));

// const getElementAttr = (elemento, key) => {
//   return elemento.getAttribute(key);
// };

// const getElementAttr = key => {
//   return function(element) {
//     return element.getAttribute(key);
//   };
// };

const getElementAttr = key => element => element.getAttribute(key);

const getAttrDataSlide = getElementAttr('data-slide');
const getAttrId = getElementAttr('id');
const dataSlideList = li.map(getAttrDataSlide);
const dataSlideId = li.map(getAttrId);
console.log(dataSlideList);
console.log(dataSlideId);
