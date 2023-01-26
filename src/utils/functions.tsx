export const identifyCreditCard = (card: string) => {
  if (card[0] === '4') {
    return 'https://blog.logomyway.com/wp-content/uploads/2022/02/visa-logo-2.jpg';
  } else if (card[0] === '5') {
    return 'https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=960';
  } else if (card[0] === '3') {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png';
  }
  return '';
}