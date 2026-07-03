const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

function updateCard(cards, update) {
  return cards.map((card) => card.id === update.id ? update : card);
}

export { getRandomArrayElement, updateCard };
