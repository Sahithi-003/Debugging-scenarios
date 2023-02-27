import { fireEvent, render, screen, createEvent } from '@testing-library/react';
import App from './App';

const setData = jest.fn()
const ev = {
dataTransfer: {
setData
}
}

test('drag and drop an item', () => {
  render(<App />);
  const draggable = screen.queryAllByText(/drag this/)[0];
  const droppable = screen.queryAllByText(/drop here/i)[0];
  const mockDropEvent = createEvent.dragStart(draggable);

  Object.assign(mockDropEvent, ev);
  fireEvent(draggable, mockDropEvent)
  
  expect(setData).toHaveBeenCalledTimes(1)
  const dropped = screen.queryAllByText("test-data");
  expect(dropped).toBeTruthy();
});

