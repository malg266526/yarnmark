import React from 'react';

const ulSeparator = '<ul>';

interface Props {
  text?: string;
}

export const TextToListFormatter = ({ text }: Props) => {
  console.log('text', text);

  if (!text || !text.includes(ulSeparator)) return text;

  const before = text.split(ulSeparator)[0];
  const listContent = text.split(ulSeparator)[1];

  console.log('before', before);

  const list = listContent
    .replaceAll(ulSeparator, '')
    .replaceAll('</ul>', '')
    .replaceAll('</li>', '')
    .split('<li>')
    .filter(Boolean);
  console.log('list', list);

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
