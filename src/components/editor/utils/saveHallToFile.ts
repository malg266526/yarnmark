import { StandProps } from '../StandProps';

export const saveHallToFile = (stands: StandProps[]) => {
  const json = JSON.stringify(stands, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hall.json'; // 👈 File name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
