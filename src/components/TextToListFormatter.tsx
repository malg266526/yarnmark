import React from 'react';

const ulSeparator = '<ul>';

interface Props {
  text?: string;
}

export const TextToListFormatter = ({ text }: Props) => {
  if (!text || !text.includes(ulSeparator)) return text;

  const before = text.split(ulSeparator)[0];
  const listContent = text.split(ulSeparator)[1];

  const list = listContent
    .replaceAll(ulSeparator, '')
    .replaceAll('</ul>', '')
    .replaceAll('</li>', '')
    .split('<li>')
    .filter(Boolean);

  return (
    <>
      {before}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};
