import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export let height = persist(writable('857000'), createLocalStorage(true), 'height');
