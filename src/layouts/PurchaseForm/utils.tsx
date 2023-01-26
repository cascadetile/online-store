export const keyDownHandler = (e: React.KeyboardEvent, maxLen: number) => {
  if (e.repeat) {
    e.preventDefault();
    return;
  }
  if (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight'
    && e.code !== 'Digit1' && e.code !== 'Digit2' 
    && e.code !== 'Digit3' && e.code !== 'Digit4' 
    && e.code !== 'Digit5' && e.code !== 'Digit6'
    && e.code !== 'Digit7' && e.code !== 'Digit8'
    && e.code !== 'Digit9' && e.code !== 'Digit0'
    && e.code !== 'Backspace') {
      e.preventDefault();
  }
  if ((e.target as HTMLInputElement).value.length >= maxLen && e.code !== 'Backspace'
    && e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') {
      e.preventDefault();
  }
}

let previousValue = '';
export const addSlash = (e: React.SyntheticEvent) => {
  if ((e.target as HTMLInputElement).value.length === 2 
    && (e.target as HTMLInputElement).value.length > previousValue.length) {
      (e.target as HTMLInputElement).value += '/';
  }
  previousValue = (e.target as HTMLInputElement).value;
}