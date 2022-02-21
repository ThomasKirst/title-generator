import { SetStateAction, SyntheticEvent } from 'react';
import Title from '../types/Title';

type StateUpdate = (value: SetStateAction<Title[]>) => void;

const fetchTitles = async (setTitles: StateUpdate) => {
  const response = await fetch('/api/titles');
  const titles = await response.json();
  setTitles(titles);
};

const postTitle = async (title: Title, setTitles: StateUpdate) => {
  const response = await fetch('/api/titles/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(title),
  });
  const newTitle = await response.json();
  setTitles((previousTitles) => [...previousTitles, newTitle]);
};

const updateTitle = async (title: Title, setTitles: StateUpdate) => {
  const response = await fetch('/api/titles/' + title.id, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(title),
  });
  const responseMessage = await response.json();
  if (responseMessage.success) {
    setTitles((previousTitles) =>
      previousTitles.map((t: Title) => (t.id === title.id ? title : t))
    );
  }
};

const deleteTitle = async (titleId: string, setTitles: StateUpdate) => {
  const response = await fetch('/api/titles/' + titleId, {
    method: 'DELETE',
  });
  const responseMessage = await response.json();
  if (responseMessage.success) {
    setTitles((previousTitles) =>
      previousTitles.filter((t: Title) => t.id !== titleId)
    );
  }
};

export { fetchTitles, postTitle, updateTitle, deleteTitle };
