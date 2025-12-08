import axios from 'axios';
import type { Note } from '@/types/note';

interface FetchNotesProps {
  search: string;
  page: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteProps {
  id?: string;
  title: string;
  content: string;
  tag: string;
}

/** @ts-expect-error - Vite env types missing */

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public-api.goit.study/api';


axios.defaults.headers.common['Authorization'] = `NotesHub ${myToken}`;



export const fetchNotes = async ({
  search,
  page,
}: FetchNotesProps): Promise<FetchNotesResponse> => {
  const response = await axios.get('/notes', {
    params: { page, perPage: 12, search },
  });

  return response.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const response = await axios.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteProps): Promise<Note> => {
  const response = await axios.post('/notes', data);
  return response.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};
