function createOneElement(tag, arrayOfClasses, content) {
  const ELEMENT = document.createElement(tag);
  if (Array.isArray(arrayOfClasses)) {
    arrayOfClasses.forEach((itemClass) => {
      ELEMENT.classList.add(itemClass);
    });
  } else {
    ELEMENT.classList.add(arrayOfClasses);
  }

  if (content !== undefined) {
    ELEMENT.textContent = content;
  }
  return ELEMENT;
}

export default createOneElement;
