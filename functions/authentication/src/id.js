export const random = () => {
    let num = '';
  for (let i = 0; i < 11; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}